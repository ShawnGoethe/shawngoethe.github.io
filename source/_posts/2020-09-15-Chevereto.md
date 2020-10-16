---
title: chevereto
date: 2020-09-15 10:16:33
top: true
tags:
- pictureBed
categories:
- Chevereto
---

# what

To solve some problems

- some web only use markdown and can't upload pictures,such as v2ex.com
- some pics you don't want to give it to others for long time,such as your interesting story 
- give your blog's  can speed when download bigger pics
- and so on

Picture Bed can offer you a excellent platform to share your pictures and protect them, however it has a problem that you need a server to run the service,even though  you can use 七牛云,alioss,weibo for free.

# why 

Chevereto is aim what I find

- dockerhub has chevereto images
- Combined with [ShareX](https://getsharex.com/) (only for windows😢),chevereto can write markdown essay easily
- it has api ,you can make it stronger
- Chevereto Free v1.2.2 now
- Something others you can discover by yourself

# how

Chevereto is a php project , I use docker to run it 

```shell
docker pull nmtan/chevereto:latest

//use docker-compose.yml(next block)

// or docker run 
docker run -it --name chevereto -d     -p 8000:80     -v "/home/xxx/images":/var/www/html/images     -e "CHEVERETO_DB_HOST=127.0.0.1"     -e "CHEVERETO_DB_USERNAME=root"     -e "CHEVERETO_DB_PASSWORD=rootpass"     -e "CHEVERETO_DB_NAME=chevereto"     -e "CHEVERETO_DB_PREFIX=chv_"  nmtan/chevereto
//-v save photos in server instead of container
//-e mysql:5.7.31 host,username,password,db_name(db must exist first)
//open chrome and input 127.0.0.1:8000

```

```
//this is docker-compose.yml
version: '3'

services:
  db:
    image: mariadb
    volumes:
      - ./database:/var/lib/mysql:rw
    restart: always
    networks:
      - private
    environment:
      MYSQL_ROOT_PASSWORD: xxxxx
      MYSQL_DATABASE: xxxxx
      MYSQL_USER: xxxxx
      MYSQL_PASSWORD: xxxxx

  chevereto:
    depends_on:
      - db
    image: nmtan/chevereto
    restart: always
    networks:
      - private
    environment:
      CHEVERETO_DB_HOST: db
      CHEVERETO_DB_USERNAME: xxxxxx
      CHEVERETO_DB_PASSWORD: xxxxx
      CHEVERETO_DB_NAME: xxxxx
      CHEVERETO_DB_PREFIX: chv_
    volumes:
      - ./images:/var/www/html/images:rw
      - ./php.ini:/usr/local/etc/php/php.ini:ro
    ports:
      - 8080:80

networks:
  private:


// start command
nohup docker-compose up  &> run.log &
disown
```



You maybe run into a stone wall when you first visit 127.0.0.1:8000

- Before you can use `docker exec -it chevereto bash ` into container /var/www/html

- no permission write phots to /home/xxx/images,you can use `chmod -R 777 /home/xxx/images`
- no permission update chevereto from 1.1.4 to1.2.2 ,`no update possible: /app/install/update/temp/ path`,that is no temp folder in /app/install/update/ under version 1.2.0,you can mkdir temp and then chmod -R 777 ./temp and then refresh the webpage ,the prics bed will update successfully

So , you can use ip address to visit your chevereto . However , we usually use domain name such as example.com to visit web, a https isn ecessary as well

- 1.Use [aliyun](https://yundunnext.console.aliyun.com/?spm=5176.2020520163.0.0.475556a7iLgQoU&p=cas) to apply  a free ssl license for a domain name such as pics.example.com
- 2.Download pem and keys to your server and put it in nginx conf folder
- 3.Use the conf as follows

```
		server {
        listen 80;
        server_name  pics.example.com;
        return 301 https://pics.example.com$request_uri;
    }

    server {
        listen 443 ssl;
        server_name  pics.example.com;
        gzip on;    

        ssl_certificate cert/xxxxxx9_pics.example.com.pem; # pem's filename
        ssl_certificate_key cert/xxxxxx9_pics.example.com.key;# key's filename

        location / {
            proxy_redirect off;
            proxy_pass http://dockername;

            proxy_set_header  Host                $http_host;
            proxy_set_header  X-Real-IP           $remote_addr;
            proxy_set_header  X-Forwarded-Ssl     on;
            proxy_set_header  X-Forwarded-For     $proxy_add_x_forwarded_for;
            proxy_set_header  X-Forwarded-Proto   $scheme;
            proxy_set_header  X-Frame-Options     SAMEORIGIN;

            client_max_body_size        100m;
            client_body_buffer_size     128k;

            proxy_buffer_size           4k;
            proxy_buffers               4 32k;
            proxy_busy_buffers_size     64k;
            proxy_temp_file_write_size  64k;
        }
    }
```

- 4. And then you can visit `https://pics.example.com` 

That‘s my story that building pics bed  ,and hope to help you.



`2020-09-28 append`

use `picgo`，upload pictures in typora to chevereto

1. GitHub download picgo,mac use [.dmp](https://github.com/Molunerfinn/PicGo/releases/download/v2.3.0-beta.3/PicGo-2.3.0-beta.3.dmg),and then install it

2. open `插件设置`,search `chevereto` and install `chevereto 1.0.0`

3. Open `图床设置>Chevereto Uploader` and put in params,

   Url is your upload service ip/domain

   Key is chevereto api in `Dashboard>Settings>API>API v1 key`

   param is not in use now

```
Url:https://example.com/api/1/upload
Key:xxx
```

4. Click `确定` and `设为默认图库`
5. make sure server is on `PicGo设置>设置Server>点击设置`,if it is on ,noting should be done

and then we modify config in typaro

1. Open Typora and open 'preferences>Images` 
2. Choose Upload images in when Insert and check `apply above rules to local images` and `apply above rules to online images` in option, and I suggest you check both of them to approve all pics managed by chevereto
3. Choose `PicGo.app` in images Uploader and click `Test Uploader` to test your upload pictures automatically

for more information ,youcan visit 

- [PicGo](https://github.com/Molunerfinn/PicGo) and [PicGo-Core](https://picgo.github.io/PicGo-Core-Doc/)
- [Upload your pictures in personal album instead of visitors' albulm](https://blog.csdn.net/qq_19564393/article/details/108506062)
- [Chevereto API](https://v3-docs.chevereto.com/API/V1.html#api-key)

# thanks

- [Chevereto](https://chevereto.com/)
- [ShareX](https://getsharex.com/)
- [ioiox's blog](https://www.ioiox.com/archives/80.html)
- [dana5haw's blog](https://dana5haw.com/posts/Docker-Image-Hosting-Chevereto.html)