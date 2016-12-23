## Adonis Node.js backend for the Cranky Cartographer


# root URL

https://trails-back-end.herokuapp.com

# Routes:

**All auth must include header Authorization containing "Bearer " followed by token.

    Register/Login

    /login - Login User
    request verb: POST
    info: include username, password in request
    Token contained in parameter access_token in response

    /users - Register User
    request verb: POST
    info: include username, password in request

    /users - Get Users
    request verb: GET
    info:  Returns list of all users

    /users/:user_id - Show User
    request verb: GET
    info: Returns information for single user

    /users/:user_id - Update User
    request verb: PATCH (auth)
    info: Update user.  Parameters are username, password, email, info, and img_url.
    Must be logged in as user and include token in header.

------------------------------------------------------------------------------------------------------

    Trails

    /trails - Get trail list
    request verb: GET
    info: get list of all trails organized by creation date

    /trails/:trail_id - Get single trail
    request verb: GET
    info: get single trail info

    /trails - Create new Trail
    request verb: POST (auth)
    info: Create trail.  Parameters include 'title', 'path', 'distance', 
    'max_elevation', 'min_elevation', 'img_url', 'description'.  Path is a text
    field with the encoded trail.  Must be logged in as user and include token in header.

    /trails/:trail_id - Update a trail
    request verb: PATCH (auth)
    info: Update trail.  Parameters include 'title', 'path', 'distance', 
    'max_elevation', 'min_elevation', 'img_url', 'description'.  Path is a text
    field with the encoded trail.  Must be logged in as user and include token in header.

    /trails/:trail_id - Delete a trail
    request verb: DELETE (auth)
    info: DELETE trail.  Must be logged in as user and include token in header.

    /trails/users/:user_id - Get trails by User
    request verb: GET
    info: Get all trails created by a specific user.
    
------------------------------------------------------------------------------------------------------
    Points
    
    /trails/:trail_id/points - Get Trail Points
    request verb: GET
    info: Get all points associated with a single trail.
    
    /points - Create Point
    request verb: POST (auth)
    info: Create new point.  Parameters include: 'lat', 'lng', 'shelter', 
    'water', 'campsite', 'view', 'parking', 'road', 'resupply', 'title',
		'description', 'img_url', 'public', 'trail_id'.  Must be logged in
     and include token in header
     
    /points/:point_id - Update Point
    request verb: PATCH (auth)
    info: Update point.  Parameters include: 'lat', 'lng', 'shelter', 
    'water', 'campsite', 'view', 'parking', 'road', 'resupply', 'title',
		'description', 'img_url', 'public', 'trail_id'.  Must be logged in
     and include token in header
     
    /points/:point_id - Delete Point
    request verb: DELETE (auth)
    info: Delete point.  Must be logged in and include token in header

------------------------------------------------------------------------------------------------------

    Hikes
    
    /hikes/users/:user_id - User Hikes
    request verb: GET
    info: Get all hikes for a user.
    
    /hikes/users/:user_id/trails - Hiked Trails
    request verb: GET
    info: Get all trails a user has hiked.
    
    /hikes/users/:user_id/trails/:trail_id - Trail Hikes
    request verb: GET
    info: Get all hikes for a specific trail and user.
    
    /hikes - Create Hike
    request verb: POST (auth)
    info: Create a hike.  Parameters include 'trail_id', 'title', 'start_date', 
    'end_date', 'description', 'path', 'start', 'end', 'distance').
    Must be logged in and include token in header.
    
    /hikes/:hike_id - Update Hike
    request verb: PATCH (auth)
    info: Update a hike.  Parameters include 'trail_id', 'title', 'start_date', 
    'end_date', 'description', 'path', 'start', 'end', 'distance').
    Must be logged in and include token in header.
    
    /hikes/:hike_id - Delete Hike
    request verb: DELETE (auth)
    info: Delete a hike. Must be logged in and include token in header.
