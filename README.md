# Mean Reddit v1.0.0

# ! Deprecation Warning !

This repo is pretty outdated and isn't easy to setup.

I haven't taken the time to fix it or get it up and running BUT if
you're interested in how it worked there's an incredibly long demo
video I made on the Demo section

## Table of Contents
* [What is this?](#what-is-this-)
* [Demo](#demo)
* [Feature Overview](#feature-overview)
* [Expansion](#expansion)
* [Develop](#develop)
* [Picture](#picture)

## What is this?
A Reddit-like application made using the MEAN stack for my Capstone at NEU. It's
definitely not a 1-to-1 imitiation of Reddit, but it has the core features.
Also, it refers to itself as "Readit" within the application (Basically just to
show that it's a knockoff of Reddit)

## Demo

[Check It](https://www.youtube.com/watch?v=k_ftQd9CsB4)

## Feature Overview
So here's an overview of the features of this site.

The site has the following top level entities:

* **Post:** A unit of content. Posts can either be a link to another site, or
  just text. Text posts are generally just for discussion. All posts are user
  submitted and controlled. Post can be upvoted or downvoted by users to change
  their score.
* **Group:**  A collection of related posts. Posts are always created on a
  group. Users can subscribe to groups to see the posts within this group. The
  group creator can delete the group.
* **User:** A basic site user.

The site has the following main pages:

* **Front Page:** What you see when you first enter the site. If you're not
  logged in, you'll see the top posts across the site. If you are logged in
  you'll only see posts from Groups you're subscribed too.
* **Group Page:** View all the posts within a group. From here you can add a new
  post to this group or subscribe to the group.
* **Post Page:** View a post. From here you can upvote or downvote a post to
  increase or decrease its score. You can also comment on the post (All actions
  but viewing require login).
* **Search Page:** Search the site for Posts, Groups, or Users.
* **Discover Page:** Find top rated posts, new content, or random content.
  Useful for new users.
* **Profile Page:** A user's profile page. If this isn't your profile page, it
  shows the users post and comment history. You can friend other users if your
  logged in. If you view your own page you can also see your friends and your
  subscribed groups.

Additionally, a restful API for the models in this project exists under
/api/MODELNAME.

## Expansion
There are still some features that I haven't implemented that I'd want to
implement in future versions. They are (in no particular order):

* **Comment Threads:** Allow comments to respond to other comments.
* **Better Error Handling:** More specifically report errors on forms.
* **Upvote/downvote for comments:** Not just posts.
* **More group owner privleges:** Allow group owners to delete/edit posts and
  comments within their groups.
* **Paginated Results:** Right now we just return all results for posts/comments
* **User messaging:** Send messages directly to other users.
* **Better Friends:** Highlight your friends' names on posts/comments.
* **List view ontrols:** Allow upvote/downvote/delete from the post list view.
* **Edit posts/comments:** Allow editing of posts or comments.

There are definitely more features to be added, that's just a small list I could
think of right now.

## Develop
Here are some instructions if you want to develop this project yourself.

Clone the Repository:

    $ git clone git@github.com:joshsamara/mean-reddit.git

You'll need to install node. [See the website
here for instructions](https://nodejs.org/download/).

You'll also need to install and start [mongodb](http://docs.mongodb.org/).

Install dependencies:

    $ npm install

You should now be good to run the server with:

    $ ./server.js

So far I've put all back-end code (the MEN of the MEAN stack) in the `src`
directory. Here are there is a `src/models` directory for descriptions of models
and a `src/route` directory for the routes.

The Angular, html, and css lives in the `public` directory. Here there's a
`public/html` for html files, `public/css` for css files, and `public/js` for js
files. All of the controller code lives in `public/js/controllers`.


## Picture
Here's a picture of an angry Reddit guy.
<pre>
                             .LLL:.       ~INMML:
                             7MMMMNNZ7~. :NM:  :MN:
                             NM:   ~=7MMMN:     :M.
                            :M:        ~MC.     .DM.
                            NI:          :N:    :N:
                           :MN            ~INIINI~
                          .MN:             ~:=:~
                          :MM
                       ,:$MM$:,
               ,:$NPMWMNMSMNMAMKMEMN$:,
    ,~~=    ~IMMMNI~              ~INMMMI~    =~~,
  :MNNNNMN$MMM~.                      .~MMM$NMNNNNM:
 :NI:  ,NMM~     \.\               /./    ~MMN,  :IN:
:M , IMM::        \.\             /./       ::MMI , M:
:M , MMT        ,I7\\\,         ,///7I,       TMM , M:
.N7 ND,        .:$$7\\\.       .///7$$:.       ,CN 7N.
 :MMM,         :$7$77\\:       ://$777$:        ,MMM:
  ~MM          .~77777~.       .~77777~.         MM~
  ~MM           ,7$$$7,         ,7$$$7,          MM~
  ,MM            ,7I7,           ,7I7,           MM,
  :7M              ,               ,             M7:
   :D$                                          $C:
    :MO,         ,==.            .==,         ,OM:
     :MM          ,MMN:        :NMM,          MM:
      :ZM$         ,INMMMMMMMMMMNI,         $MZ:
       :7NM7,          ~=7777=~          ,7MN7:
          ~$IMMN7~,                ,~7NMMI~
              :IMMMMMMNN$III$NNMMMMMMI:
            NMMO   .~7$OMNOMNOML$~.  OMMN
           IMNZMI~                 ~IMZNMI
          ~M$ NMI~                 ~IMN $M~
         :N$  ZMI                   IMZ  $N:
         $M   NM~                   ~MN   M$
        :OM   MM~                   ~MM   MO:
        :DM.  NM~                   ~MN  .MD:
         $M   NMI                   IMN   M$
         :N$  ZMI                   IMZ  $N:
          ~M$ ~MI                   IM~ $M~
           MN: NM~                 ~MN :NM
            MNNMM~                 ~MMNNM
              ~MZD                 CZM~
               ~MN                 NM~
                ~DM               MM~
            ICMMMMMM             MMMMMMDL
           TMM~  :NM7           7MN:   ~MMT
          :MZ     :MD~         ~MD:      PM:
          OMO:::::::IMMD~.__.~CMMI=:::::::OMO
          IMMMMMMMMMMMMMREDDITMMMMMMMMMNMMMMI
</pre>

