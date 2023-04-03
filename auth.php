<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Anobody can login with any password.
 *
 * @package auth_none
 * @author Martin Dougiamas
 * @license http://www.gnu.org/copyleft/gpl.html GNU Public License
 */

defined('MOODLE_INTERNAL') || die();

require_once($CFG->libdir.'/authlib.php');

/**
 * Plugin for no authentication.
 */
class auth_plugin_faceid extends auth_plugin_base {

    /**
     * Constructor.
     */
    public function __construct() {
        $this->authtype = 'faceid';
        $this->config = get_config('auth_faceid');
    }


    /**
     * Returns true if the username and password work or don't exist and false
     * if the user exists and the password is wrong.
     *
     * @param string $username The username
     * @param string $password The password
     * @return bool Authentication success or failure.
     */
    function user_login ($username, $password) {
        error_log("INVALID LOGIN NININI");
        return true;
    }

    function prevent_local_passwords() {
        return false;
    }

    /**
     * Returns true if this authentication plugin is 'internal'.
     *
     * @return bool
     */
    function is_internal() {
        return true;
    }

    /**
     * Returns true if plugin allows resetting of internal password.
     *
     * @return bool
     */
    function can_reset_password() {
        return true;
    }

    /**
     * Returns true if plugin can be manually set.
     *
     * @return bool
     */
    function can_be_manually_set() {
        return true;
    }

    function loginpage_hook() {
        global $PAGE, $OUTPUT, $CFG, $DB, $SESSION; 

        if (isset($SESSION->id) && isset($SESSION->password)) {
            $id = $SESSION->id;
            $token = $SESSION->password;

            $SESSION->id = null;
            $SESSION->password = null;

            if ($usr = $DB->get_record('user', ['id' => $id, 'mnethostid' => $CFG->mnet_localhost_id])) {
                error_log("ID: " . $id);
                error_log("DB Password: " . $usr->password);
                error_log("Sent Password: " . $token);
                authenticate_user_login($usr->username, $token);
                if(complete_user_login($usr)) {
                    error_log("Success?");
                }
                redirect($CFG->wwwroot."/");
            } 
        } else {

        $cont = <<<HTML
                <div class="faceproviderlink">
                    <a href="{$CFG->wwwroot}/auth/faceid/client/index.php">FaceID</a>
                </div>
        HTML;

        $PAGE->requires->jquery();

        $PAGE->requires->js_init_code("buttonsAddMethod = 'auto';");
        $content = str_replace(array("\n", "\r"), array("\\\n", "\\\r"), $cont);
        $PAGE->requires->css('/auth/faceid/style.css');
        $PAGE->requires->js_init_code("buttonsCode = '$content';");
        $PAGE->requires->js(new moodle_url($CFG->httpswwwroot . "/auth/faceid/script.js"));
        }


    }

}


