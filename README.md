NASA Planet Explorer
Explore the cosmos with our NASA site! Access detailed planet data and schedule your own rocket launches. Our platform provides up-to-date information about various celestial bodies and allows space enthusiasts to plan and schedule rocket launches seamlessly.

To start up docker, navigate into the server folder by using CMD "cd server"

Then open your terminal and type docker build .
This command above should build and download the source code as configurated in the docker config file.

copy the container id after the build is completed then run the command below

docker run -p 8000:8000 container_id

This should exporse the port 8000 and your server will run on that PORT.
