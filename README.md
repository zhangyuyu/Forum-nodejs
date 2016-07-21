### Build the Application
`npm install`


### Start the Application
`gulp start`


### Access the Application

* Home Page
`http://localhost:3000/forum-api`

* Blogs Page
	* Get All blogs
	`http://localhost:3000/forum-api/blogs`
	
	* Get One post by id
	`http://localhost:3000/forum-api/blogs/578c8ddbe70841203a5b715f`
	
	* Create One Post
	```
	http://localhost:3000/forum-api/blogs/
	Content-Type: application/vnd.api+json
	```
	```
	body:
	{
        "title": "Second Blog",
        "author": "Zhang Yu",
        "body": "A truth needs no colour; beauty, no pencil!",
        "hidden": false,
        "meta": {
            "votes": 2,
            "favs": 1 
        },
        "comments":
        [ 
            {
                "body": "Some fish could not be kept in cptivity. Because they belong to the sky",
                "date": "2016-07-18T17:10:47.149Z"
            }
        ]
    }
	```
	
	* Delete One post by id
	`http://localhost:3000/forum-api/blogs/578c8ddbe70841203a5b715f`
