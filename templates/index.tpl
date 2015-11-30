<!DOCTYPE html>
<!--[if IE 8]><html class="lt-ie10 lt-ie9"> <![endif]-->
<!--[if IE 9]><html class="lt-ie10"> <![endif]-->
<!--[if gt IE 9]><!--> <html> <!--<![endif]-->
  <head>
    {MobileAppHeaders}
    <meta charset="utf-8">
    
    <title>
      {Title}{block:SearchPage} ({lang:Search results for SearchQuery}){/block:SearchPage}{block:PermalinkPage}{block:PostSummary} — {PostSummary}{/block:PostSummary}{/block:PermalinkPage}
    </title>
    
    {block:Description}
      <meta name="description" content="The Dreamer: dreams archive of Trdat Mkrtchyan">
    {/block:Description}

    {{metas}}

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="shortcut icon" href="{Favicon}">
    <link rel="apple-touch-icon-precomposed" href="{PortraitURL-128}">
    <link rel="alternate" type="application/rss+xml" href="{RSS}">

    <link rel="stylesheet" href="http://static.tumblr.com/05o0pke/yeTnx9gi9/main-min.css">

    <!-- HTML5 Shiv -->
    <!--[if lt IE 9]>
        <script src="http://static.tumblr.com/hriofhd/Qj0m8pn7q/html5shiv.js"></script>
    <![endif]-->

    {{tumblr-styles}}
    {{css: ['main']}}

  </head>
  <body data-urlencoded-name="{URLEncodedName}" 
        class=" {select:Layout}
                {block:IndexPage}index-page{/block:IndexPage}
                {block:PermalinkPage} permalink{/block:PermalinkPage}
                {block:SearchPage} search-page{block:NoSearchResults} no-results{/block:NoSearchResults}{/block:SearchPage}
                {block:HideHeaderImage} no-header-image{/block:HideHeaderImage}
                {block:NoStretchHeaderImage} contain-header-image{/block:NoStretchHeaderImage}
                {block:IfRelatedPosts} display-related-posts{/block:IfRelatedPosts}">

    {{app-nag}}

    <!-- PAGE --> 
    <section id="page">

      {{b-search}}
      {{b-header}}
      {{b-page_type_search}}

      <!-- POSTS -->
      <section  id="posts" 
                class="content clearfix 
                {block:HideTitle}{block:HideDescription}no-title-desc {/block:HideDescription}{/block:HideTitle}
                {block:HideHeaderImage}no-image {/block:HideHeaderImage} 
                {block:ShowAvatar} avatar-style-{AvatarShape}{/block:ShowAvatar} {block:HideAvatar} avatar-hidden{/block:HideAvatar}
                {block:IfShowNavigation}s how-nav{/block:IfShowNavigation}">

        <div data-page-id="{CurrentPage}">
          
          {block:Posts inlineMediaWidth="700" inlineNestedMediaWidth="700"}
            <article 
               class="{block:Text}text {/block:Text}
                      {block:Photoset}photoset {/block:Photoset}
                      {block:Photo}photo {/block:Photo}
                      {block:RebloggedFrom}reblogged {/block:RebloggedFrom}
                      {block:Quote}quote {/block:Quote}
                      {block:Link}link {/block:Link}
                      {block:Chat}chat {/block:Chat}
                      {block:Audio}audio {/block:Audio}
                      {block:Video}video {/block:Video}
                      {block:Answer}answer {/block:Answer}
                      {block:Date}not-page post-{PostID}{/block:Date} 
                      {block:PermalinkPage} active exposed{/block:PermalinkPage}" 
                {block:Date}data-post-id="{PostID}"{/block:Date}>

                <div class="post-wrapper clearfix">
                  
                  {{b-post__reblogged-from}}
                  
                  <section class="post">
                  
                    {{b-post_type_text-block}}

                    {{b-post_type_photo-block}}

                    {{b-post_type_photoset-block}}

                    {{b-post_type_quote-block}}

                    {{b-post_type_link-block}}

                    {{b-post_type_chat-block}}

                    {{b-post_type_audio-block}}

                    {{b-post_type_video-block}}

                    {{b-post_type_answer-block}}

                    {{b-post__inline-meta}}

                  </section>


                  {{b-post-date}}

                  {{b-permalink-page}}

                </div>
              </article>
            {/block:Posts}
          </div>
        </section>

        {{b-related-posts}}
        {{b-post__footer}}

      </section>
      
     {{b-scripts}}
  </body>
</html>