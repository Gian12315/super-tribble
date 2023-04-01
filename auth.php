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
        return false;
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
        global $PAGE, $OUTPUT, $CFG, $DB, $USER, $SESSION;


        $cont = <<<HTML
                <div class="faceproviderlink">
                    <a href="{$CFG->wwwroot}/auth/faceid/client/index.html">FaceID</a>
                </div>
        HTML;

        $id = optional_param('id', '', PARAM_TEXT);
        $token = optional_param('password', '', PARAM_TEXT);
        error_log("We got here bro");
        error_log($id);
        error_log($token);
        if (!empty($token)) {
            if ($user = $DB->get_record('user', ['id' => $id])) {
                // error_log($user);
                if ($usr->password == $token) {
                    error_log("DB Password: " . $usr->password);
                    error_log("Sent Password: " . $token);
                complete_user_login($usr);
    	if (user_not_fully_set_up($USER)) {
    		$urltogo = $CFG->wwwroot.'/user/edit.php';
    		// We don't delete $SESSION->wantsurl yet, so we get there later
    	} else if (isset($SESSION->wantsurl) and (strpos($SESSION->wantsurl, $CFG->wwwroot) === 0)) {
    		$urltogo = $SESSION->wantsurl;    // Because it's an address in this site
    		unset($SESSION->wantsurl);
    	} else {
    		// No wantsurl stored or external - go to homepage
    		$urltogo = $CFG->wwwroot.'/';
    		unset($SESSION->wantsurl);
    	}
    	redirect($urltogo);
                }
            } 
        }

        $PAGE->requires->jquery();

        $PAGE->requires->js_init_code("buttonsAddMethod = 'auto';");
        $content = str_replace(array("\n", "\r"), array("\\\n", "\\\r"), $cont);
        $PAGE->requires->css('/auth/faceid/style.css');
        $PAGE->requires->js_init_code("buttonsCode = '$content';");
        $PAGE->requires->js(new moodle_url($CFG->httpswwwroot . "/auth/faceid/script.js"));



    }

}


