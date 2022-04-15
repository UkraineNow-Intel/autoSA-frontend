
const sourceData = {
    results: [
        {
            "id": 9,
            "interface": "website",
            "origin": "https://example.com",
            "headline": "Testsource",
            "text": "This source is important for route 1 and route 2.",
            "language": "en",
            "pinned": true,
            "timestamp": "2022-04-05T13:02:14Z",
            "tags": [
                "route-1",
                "route-2"
            ],
            "translations": []
        },
        {
            "id": 10,
            "interface": "twitter",
            "origin": "@testperson",
            "headline": "",
            "text": "This old source is important for route 1.",
            "language": "en",
            "pinned": false,
            "timestamp": "2020-03-31T22:00:00Z",
            "tags": [
                "route-1"
            ],
            "translations": []
        },
        {
            "id": 11,
            "interface": "api",
            "origin": "Fraktal",
            "headline": "",
            "text": "This source is important for route 2.",
            "language": "ua",
            "pinned": false,
            "timestamp": "2022-03-31T22:00:00Z",
            "tags": [
                "route-2"
            ],
            "translations": []
        },
        {
            "id": 12,
            "interface": "twitter",
            "origin": "@twitterguy",
            "headline": "",
            "text": "This is an unimportant post with no tags...",
            "language": "en",
            "pinned": true,
            "timestamp": "2022-04-19T22:00:00Z",
            "tags": [],
            "translations": []
        },
        {
            "id": 13,
            "interface": "website",
            "origin": "http://google.com",
            "headline": "",
            "text": "This source is so important, that it's even pinned!",
            "language": "en",
            "pinned": true,
            "timestamp": "2010-04-03T22:00:00Z",
            "tags": [],
            "translations": []
        },
        {
            "id": 14,
            "interface": "website",
            "origin": "book",
            "headline": "",
            "text": "This source is pinned and also important for route 2. You can hide it in the right column using \"hide all pinned\". It further has a really long text, so I am going to keep adding random words here so that you might see that it overflows at some point. All items have a fixed height, wherefore a small scrollbar appears on the right when the text is too long.",
            "language": "en",
            "pinned": true,
            "timestamp": "2022-04-03T22:00:00Z",
            "tags": [
                "route-2"
            ],
            "translations": []
        }
    ]
}

const newSourceData = {
    "interface": "twitter",
    "origin": "@newTwitterAccount",
    "headline": "",
    "text": "This source was newly created.",
    "language": "en",
    "timestamp": "2022-05-03T22:00:00Z"
}


const whoamiData = {
    "username": "admin",
    "isAuthenticated": true,
    "permissions": [
        { "id": 1, "name": "Can add log entry", "content_type_id": 1, "codename": "add_logentry" },
        { "id": 2, "name": "Can change log entry", "content_type_id": 1, "codename": "change_logentry" },
        { "id": 3, "name": "Can delete log entry", "content_type_id": 1, "codename": "delete_logentry" },
        { "id": 4, "name": "Can view log entry", "content_type_id": 1, "codename": "view_logentry" },
        { "id": 33, "name": "Can add source", "content_type_id": 9, "codename": "add_source" },
        { "id": 34, "name": "Can change source", "content_type_id": 9, "codename": "change_source" },
        { "id": 35, "name": "Can delete source", "content_type_id": 9, "codename": "delete_source" },
        { "id": 36, "name": "Can view source", "content_type_id": 9, "codename": "view_source" },
        { "id": 37, "name": "Can add translation", "content_type_id": 10, "codename": "add_translation" },
        { "id": 38, "name": "Can change translation", "content_type_id": 10, "codename": "change_translation" },
        { "id": 39, "name": "Can delete translation", "content_type_id": 10, "codename": "delete_translation" },
        { "id": 40, "name": "Can view translation", "content_type_id": 10, "codename": "view_translation" },
        { "id": 9, "name": "Can add group", "content_type_id": 3, "codename": "add_group" },
        { "id": 10, "name": "Can change group", "content_type_id": 3, "codename": "change_group" },
        { "id": 11, "name": "Can delete group", "content_type_id": 3, "codename": "delete_group" },
        { "id": 12, "name": "Can view group", "content_type_id": 3, "codename": "view_group" },
        { "id": 5, "name": "Can add permission", "content_type_id": 2, "codename": "add_permission" },
        { "id": 6, "name": "Can change permission", "content_type_id": 2, "codename": "change_permission" },
        { "id": 7, "name": "Can delete permission", "content_type_id": 2, "codename": "delete_permission" },
        { "id": 8, "name": "Can view permission", "content_type_id": 2, "codename": "view_permission" },
        { "id": 13, "name": "Can add user", "content_type_id": 4, "codename": "add_user" },
        { "id": 14, "name": "Can change user", "content_type_id": 4, "codename": "change_user" },
        { "id": 15, "name": "Can delete user", "content_type_id": 4, "codename": "delete_user" },
        { "id": 16, "name": "Can view user", "content_type_id": 4, "codename": "view_user" },
        { "id": 17, "name": "Can add content type", "content_type_id": 5, "codename": "add_contenttype" },
        { "id": 18, "name": "Can change content type", "content_type_id": 5, "codename": "change_contenttype" },
        { "id": 19, "name": "Can delete content type", "content_type_id": 5, "codename": "delete_contenttype" },
        { "id": 20, "name": "Can view content type", "content_type_id": 5, "codename": "view_contenttype" },
        { "id": 61, "name": "Can add clocked", "content_type_id": 16, "codename": "add_clockedschedule" },
        { "id": 62, "name": "Can change clocked", "content_type_id": 16, "codename": "change_clockedschedule" },
        { "id": 63, "name": "Can delete clocked", "content_type_id": 16, "codename": "delete_clockedschedule" },
        { "id": 64, "name": "Can view clocked", "content_type_id": 16, "codename": "view_clockedschedule" },
        { "id": 41, "name": "Can add crontab", "content_type_id": 11, "codename": "add_crontabschedule" },
        { "id": 42, "name": "Can change crontab", "content_type_id": 11, "codename": "change_crontabschedule" },
        { "id": 43, "name": "Can delete crontab", "content_type_id": 11, "codename": "delete_crontabschedule" },
        { "id": 44, "name": "Can view crontab", "content_type_id": 11, "codename": "view_crontabschedule" },
        { "id": 45, "name": "Can add interval", "content_type_id": 12, "codename": "add_intervalschedule" },
        { "id": 46, "name": "Can change interval", "content_type_id": 12, "codename": "change_intervalschedule" },
        { "id": 47, "name": "Can delete interval", "content_type_id": 12, "codename": "delete_intervalschedule" },
        { "id": 48, "name": "Can view interval", "content_type_id": 12, "codename": "view_intervalschedule" },
        { "id": 49, "name": "Can add periodic task", "content_type_id": 13, "codename": "add_periodictask" },
        { "id": 50, "name": "Can change periodic task", "content_type_id": 13, "codename": "change_periodictask" },
        { "id": 51, "name": "Can delete periodic task", "content_type_id": 13, "codename": "delete_periodictask" },
        { "id": 52, "name": "Can view periodic task", "content_type_id": 13, "codename": "view_periodictask" },
        { "id": 53, "name": "Can add periodic tasks", "content_type_id": 14, "codename": "add_periodictasks" },
        { "id": 54, "name": "Can change periodic tasks", "content_type_id": 14, "codename": "change_periodictasks" },
        { "id": 55, "name": "Can delete periodic tasks", "content_type_id": 14, "codename": "delete_periodictasks" },
        { "id": 56, "name": "Can view periodic tasks", "content_type_id": 14, "codename": "view_periodictasks" },
        { "id": 57, "name": "Can add solar event", "content_type_id": 15, "codename": "add_solarschedule" },
        { "id": 58, "name": "Can change solar event", "content_type_id": 15, "codename": "change_solarschedule" },
        { "id": 59, "name": "Can delete solar event", "content_type_id": 15, "codename": "delete_solarschedule" },
        { "id": 60, "name": "Can view solar event", "content_type_id": 15, "codename": "view_solarschedule" },
        { "id": 21, "name": "Can add session", "content_type_id": 6, "codename": "add_session" },
        { "id": 22, "name": "Can change session", "content_type_id": 6, "codename": "change_session" },
        { "id": 23, "name": "Can delete session", "content_type_id": 6, "codename": "delete_session" },
        { "id": 24, "name": "Can view session", "content_type_id": 6, "codename": "view_session" },
        { "id": 25, "name": "Can add tag", "content_type_id": 7, "codename": "add_tag" },
        { "id": 26, "name": "Can change tag", "content_type_id": 7, "codename": "change_tag" },
        { "id": 27, "name": "Can delete tag", "content_type_id": 7, "codename": "delete_tag" },
        { "id": 28, "name": "Can view tag", "content_type_id": 7, "codename": "view_tag" },
        { "id": 29, "name": "Can add tagged item", "content_type_id": 8, "codename": "add_taggeditem" },
        { "id": 30, "name": "Can change tagged item", "content_type_id": 8, "codename": "change_taggeditem" },
        { "id": 31, "name": "Can delete tagged item", "content_type_id": 8, "codename": "delete_taggeditem" },
        { "id": 32, "name": "Can view tagged item", "content_type_id": 8, "codename": "view_taggeditem" }]
}
export { whoamiData, sourceData, newSourceData }