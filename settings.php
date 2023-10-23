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
 * Admin settings and defaults.
 *
 * @package auth_none
 * @copyright  2017 Stephen Bourget
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die;

if ($ADMIN->fulltree) {

    // Introductory explanation.
    $settings->add(new admin_setting_heading('auth_faceid/pluginname', '',
        new lang_string('auth_faceiddescription', 'auth_faceid')));

    // AWS and Database settings

    $settings->add(new admin_setting_configtext('auth_faceid/aws_region', 'AWS Region', '', '', PARAM_ALPHANUMEXT));
    $settings->add(new admin_setting_configtext('auth_faceid/aws_public_key', 'AWS Public Key', '', '', PARAM_ALPHANUM));
    $settings->add(new admin_setting_configtext('auth_faceid/aws_secret_key', 'AWS Secret Key', '', '', PARAM_TEXT));
    $settings->add(new admin_setting_configtext('auth_faceid/db_dialect', 'Database Dialect', '', 'mysql', PARAM_ALPHANUM));
    $settings->add(new admin_setting_configtext('auth_faceid/db_host', 'Database host', '', 'localhost', PARAM_LOCALURL));
    $settings->add(new admin_setting_configtext('auth_faceid/db_name', 'Database name', '', 'moodle', PARAM_ALPHANUM));
    $settings->add(new admin_setting_configtext('auth_faceid/db_user', 'Database username', '', 'root', PARAM_ALPHANUM));
    $settings->add(new admin_setting_configtext('auth_faceid/db_password', 'Database password', '', '', PARAM_ALPHANUMEXT));



    // Display locking / mapping of profile fields.
    $authplugin = get_auth_plugin('faceid');
    // display_auth_lock_options($settings, $authplugin->authtype, $authplugin->userfields,
    //     get_string('auth_fieldlocks_help', 'auth'), false, false);
}
