<template>
  <div class="home">
    <section class="banner">
      <div class="banner-wraper">
        <div class="container">
          <div class="banner-content">
            <h2 class="banner-title capitalized mb-4">
               {{ api || 'NOPE' }}
              The world’s first cryptocurrency platform specializing in
              investment funds and products
            </h2>
            <h4 class="banner-sub-title mb-4">
              There's finally a secure investment solution managed by veteran
              cryptocurrency traders that enables current and new cryptocurrency
              investors to grow their digital capital with minimal risk and
              maximized gains regardless of the volatility of the market.
            </h4>
            <b-btn variant="outline-light" size="lg" :to="'/register'">Get started</b-btn>
          </div>
        </div>
      </div>
    </section>
    <top-performing-funds />
    <section class="mission">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <div class="mission-thumbnail">
              <div class="content-thumbnail">
                <img src="img/feature-img.png" alt="" />
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <div class="mission-content">
              <h2>Our mission</h2>
              <p>
                Giving our customers investment services and products in a secure
                environment that helps maximize gains and manage
                risk as well as providing piece of mind with expert
                traders continuously watching and studying the market for them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="howitworks" class="howitworks">
      <div class="container howitworks-container">
        <div class="row justify-content-center">
          <div class="col-lg-7 col-md-7 col-sm-10 col-xs-12 section-heading">
            <h2>How it works</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 col-sm-6 col-xs-12">
            <div class="module_box shadow-lg">
              <img src="/img/icon1.png" alt="" />
              <h3>Create an account </h3>
            </div>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <div class="module_box shadow-lg">
              <img src="/img/icon2.png" alt="" />
              <h3>Fund your account</h3>
            </div>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <div class="module_box shadow-lg">
              <img src="/img/icon3.png" alt="" />
              <h3>Start investing</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="portfolio-features">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 ccol-sm-10 col-xs-12 section-heading">
            <h2>Create your digital currency portfolio today</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-sm-12">
            <div class="features-items">
              <div class="feature-item-module row">
                <div class="col-lg-3 col-sm-12 ">
                  <div class="module-icon">
                    <icon name="fire-extinguisher" class="feature-icon" />
                  </div>
                </div>
                <div class="col-lg-9 col-sm-12">
                  <div class="module-text">
                    <h4>Manage your risk</h4>
                    <p>Choose from a variety of investment funds with different levels of risk.</p>
                  </div>
                </div>
              </div>
              <div class="feature-item-module row">
                <div class="col-lg-3 col-sm-12">
                  <div class="module-icon">
                    <icon name="chart-line" class="feature-icon" />
                  </div>
                </div>
                <div class="col-lg-9 col-sm-12">
                  <div class="module-text">
                    <h4>Manage Your Portfolio</h4>
                    <p>Maximize gains by strategically allocating assets to high performing funds.</p>
                  </div>
                </div>
              </div>
              <div class="feature-item-module row">
                <div class="col-lg-3 col-sm-12">
                  <div class="module-icon">
                    <icon name="user-friends" class="feature-icon" />
                  </div>
                </div>
                <div class="col-lg-9 col-sm-12">
                  <div class="module-text">
                    <h4>Referral Incentives</h4>
                    <p>
                      Refer other investors to the platform to participate in
                      our competitive affiliate program.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-12">
            <div class="app_screen">
              <img src="img/mockup.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="subscription">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 col-md-7 col-sm-9 col-xs-12 subscription-form">
            <h2>Subscribe to us and get notified</h2>
            <form action="">
              <div class="form-group">
                <input type="email" placeholder="Enter your email here" />
                <button> <img src="img/send.png" alt="" /></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import TopPerformingFunds from '@/components/TopPerformingFunds.vue';
export default {
  name: 'home',
  components: {
    TopPerformingFunds,
  },
  computed: {
    api() {
      return process.env.VUE_APP_API_URL;
    }
  }
};
</script>

<style lang="scss" scoped>
html {
  color: #222;
  font-size: 1em;
  line-height: 1.4;
  font-family:'Rubik-Regular';
}


::-moz-selection {
    background: #b3d4fc;
    text-shadow: none;
}

::selection {
    background: #b3d4fc;
    text-shadow: none;
}

hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #ccc;
    margin: 1em 0;
    padding: 0;
}


audio,
canvas,
iframe,
img,
svg,
video {
    vertical-align: middle;
}

fieldset {
    border: 0;
    margin: 0;
    padding: 0;
}

textarea {
    resize: vertical;
}

.browserupgrade {
    margin: 0.2em 0;
    background: #ccc;
    color: #000;
    padding: 0.2em 0;
}

/* ==========================================================================
   Author's custom styles
   ========================================================================== */

/*Typography*/

@font-face{
  font-family:'Rubik-Bold';
  src:url('/fonts/Rubik-Bold.ttf');
}
@font-face{
  font-family:'icofont';
  src:url('/fonts/icofont.ttf');
}

@font-face{
  font-family:'Rubik-Regular';
  src:url('/fonts/Rubik-Regular.ttf');
}


@font-face{
  font-family:'Rubik-Light';
  src:url('/fonts/Rubik-Light.ttf');
}


p {
  font-family:'Rubik-Regular';
  font-size:15px;
}

h1{
  font-family:'Rubik-Bold';
  font-size:3em;

}
h2{
  font-family:'Rubik-Bold';
  font-size:2em;

}
h3{
  font-family:'Rubik-Bold';
  font-size:1.5em;

}
h4{
  font-family:'Rubik-Bold';
  font-size:1em;

}
h5{
  font-family:'Rubik-Bold';
  font-size:.8em;

}
h6{
  font-family:'Rubik-Bold';
  font-size:.5em;

}

/*essetials for list items and hyperlink */

ul {

  margin:0;
  padding:0;

}

ul li {

  list-style:none;
}
a {

  text-decoration:none;
}
a:hover{

  text-decoration:none;
}

/*Custom css*/


/*Banner section*/
.banner {
  width:100%;
  height:100vh;
  background:url("/img/banner-bg.png");
  background-size:cover;
  background-repeat:no-repeat;
  background-position:center center;
  position:relative;
}

@media(max-width: 468px) {
  .banner-title {
    font-size: 1em;
  }
  .banner-sub-title {
    font-size: 0.7em;
  }
}

@media(max-width: 340px) {
  .banner {
    height: 130vh;
  }
}

.banner:before {
  content:"";
  position:absolute;
  width:100%;
  height:100%;
  top:0;
  left:0;
  background:rgba(25, 89, 197, .9);
}
.banner:after {
  content:"";
  position:absolute;
  width:100%;
  height:100%;
  bottom:-5px;
  left:0;
  background:url(/img/banner-wave.png);
  background-repeat:no-repeat;
  background-size:contain;
  background-position:bottom center;
}
.banner-title {
  letter-spacing: 0.15em;
  line-height: 1.7;
}
.banner-sub-title {
  letter-spacing: 0.08em;
  line-height: 1.5;
}

.nav-wraper {
  width:100%;
  height:auto;
  position:fixed;
  z-index:99;
}
.banner-wraper {
  width:100%;
  height:inherit;
  position:absolute;
  z-index:90;
}
.sticky {
  background:map-get($theme-colors, primary);
  -webkit-box-shadow: 0px 5px 17px 0px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 5px 17px 0px rgba(0,0,0,0.2);
  box-shadow: 0px 5px 17px 0px rgba(0,0,0,0.2);
}
.banner-content {
  padding-top:200px;
  text-align:center;
  color:#ffffff;
}

/*mission area*/
.mission {
  width:100%;
  height:auto;
  padding:50px 0px 100px;
  position:relative;
  background:#fbfbfb;
}

.mission:before {
  content:"";
  position:absolute;
  width:200px;
  height:100%;
  left:20%;
  top:0;
  background:map-get($theme-colors, primary);
}
.mission-thumbnail {
  padding:50px;
}
.content-thumbnail {
  width:100%;
}
.content-thumbnail img {
  width:100%;
  height:auto;
}

.mission-content {
  background:#fbfbfb;
  padding-top:70px;
}
.mission-content h2 {
  font-size:1.8em;
  color:map-get($theme-colors, primary);
  text-transform:uppercase;

}

/*how it works area*/

.howitworks {
  width:100%;
  height:auto;
  padding:100px 0;
  position:relative;
}

.howitworks:after {
  content:"";
  position:absolute;
  width:100%;
  height:30%;
  bottom:0;
  left:0;
  background:url(/img/subscription-bg.png);
  background-size:cover;
  background-position:center center;
  z-index:-11;
}
.howitworks:before {
  content:"";
  position:absolute;
  width:100%;
  height:30%;
  bottom:0;
  left:0;
  background:rgba(25, 89, 197, .8);
  background-size:cover;
  background-position:center center;
  z-index:-10;
}

.howitworks-container {
  position: relative;
  top: 60px;
}

.section-heading {
  text-align:center;
}
.section-heading h2 {
  font-size:1.8em;
  color:map-get($theme-colors, primary);
  text-transform:uppercase;
}
.module-portion {

  margin-top:30px;
}
.module_box {

  text-align:center;
  padding:30px;
  border-radius:15px;
  background:#ffffff;
  margin:30px 0px;
}
.module_box img {

  padding-bottom:20px;
}
.module_box h3 {
  font-size:16px;
  text-align:center;
}

/*portfolio-features area*/

.portfolio-features {
  width:100%;
  height:auto;
  padding:100px 0px;
}
.feature-item-module {
  padding:15px;
  border-radius:10px;
  margin:20px 0px;
  -webkit-box-shadow: 0px 0px 12px 1px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 0px 12px 1px rgba(0,0,0,0.2);
  box-shadow: 0px 0px 12px 1px rgba(0,0,0,0.2);

}

.module-icon{
  background:map-get($theme-colors, primary);
  border-radius:100%;
  width:100px;
  height:100px;
  text-align:center;
  padding:18px;
}

.feature-icon {
  fill: white;
  height: 100%;
  width: 100%;
}
.module-text {
  padding-top:15px;
}
.app_screen {
  padding-top:70px;
}
.app_screen img {
  width:100%;
  height:auto;
}

/*subscription portion style*/
.subscription {
  width:100%;
  min-height:300px;
  padding:100px 0px;
  background:url("/img/subscription-bg.png");
  background-size:auto;
  background-position:center center;
  background-repeat:no-repeat;
  position:relative;
}

.subscription:before{
  content:"";
  width:100%;
  height:100%;
  position:absolute;
  top:0;
  left:0;
  background:map-get($theme-colors, primary);
  opacity:.8;
  z-index:1;
}
.subscription-form {
  position:absolute;
  z-index:9;
  top:25%;
}
.subscription h2 {
  font-size:2rem;
  color:#ffffff;
  text-align:center;
  padding-bottom:20px;
  text-transform:uppercase;
}
.form-group {
  position:relative;
}


.subscription-form input {
  width:100%;
  height:45px;
  border-radius:30px;
  background:#ffffff;
  border:1px solid #f7f7f7;
  padding:0px 20px;
  color:#666666;
}
.subscription-form button {
  background:transparent;
  position:absolute;
  top:9px;
  right:30px;
  border:none;
}

/* ==========================================================================
   Helper classes
   ========================================================================== */

/*
 * Hide visually and from screen readers
 */

.hidden {
    display: none !important;
}

/*
 * Hide only visually, but have it available for screen readers:
 * http://snook.ca/archives/html_and_css/hiding-content-for-accessibility
 */

.visuallyhidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}

/*
 * Extends the .visuallyhidden class to allow the element
 * to be focusable when navigated to via the keyboard:
 * https://www.drupal.org/node/897638
 */

.visuallyhidden.focusable:active,
.visuallyhidden.focusable:focus {
    clip: auto;
    height: auto;
    margin: 0;
    overflow: visible;
    position: static;
    width: auto;
}
/*
 * Hide visually and from screen readers, but maintain layout
 */
.invisible {
  visibility: hidden;
}
.clearfix:before,
.clearfix:after {
  content: " "; /* 1 */
  display: table; /* 2 */
}
.clearfix:after {
    clear: both;
}
@media only screen and (max-width: 991px) {
  .navbar-collapse {
    background:map-get($theme-colors, primary);
    color:#ffffff;
    text-align:center;
    padding:30px;
    width:90%;
    float:none;

    -webkit-box-shadow: 0px 8px 34px 0px rgba(1,15,31,0.4);
    -moz-box-shadow: 0px 8px 34px 0px rgba(1,15,31,0.4);
    box-shadow: 0px 8px 34px 0px rgba(1,15,31,0.4);
  }
  .navbar-collapse ul li {
    min-width:200px;
    max-width:350px;
    margin:auto;
  }
  .navbar-collapse ul li a {
    padding:15px 20px;
  }
  .navbar-collapse ul li a:hover {
    background:transparent;
    transform:scale(1.5);
    color:#ffffff;
    box-shadow:none;
  }
  .mission-thumbnail {
    padding:30px;
  }
  .content-thumbnail {
    width:100%;
  }
  .content-thumbnail img {
    width:100%;
    height:auto;
  }
  .mission-content {
    background:#fbfbfb;
    padding-top:50px;
  }
  .module-icon{
    width:80px;
    height:80px;
    text-align:center;
    padding-top:22px;
    margin:auto;
  }
  .module-text {
    text-align:center;
  }
}
@media only screen and (max-width: 768px) {
  .mission {
    padding:50px 30px;
  }
  .mission-thumbnail {
    padding:0;
  }
  .content-thumbnail {
    width:100%;
  }
  .content-thumbnail img {
    width:100%;
    height:auto;
  }
  .mission-content {
    background:#fbfbfb;
    padding:50px 0px;
  }
  .howitworks, .portfolio-features, .testimonial {
    padding:50px 30px;
  }
  .feature-item-module {
    margin-top:30px;
  }
  .subscription-form {
    position:absolute;
    z-index:99;
    top:20%;
    padding:0 30px;
  }
}

@media print,
       (-webkit-min-device-pixel-ratio: 1.25),
       (min-resolution: 1.25dppx),
       (min-resolution: 120dpi) {
    /* Style adjustments for high resolution devices */
}
/* ==========================================================================
   Print styles.
   Inlined to avoid the additional HTTP request:
   http://www.phpied.com/delay-loading-your-print-css/
   ========================================================================== */
@media print {
  *,
  *:before,
  *:after,
  *:first-letter,
  *:first-line {
      background: transparent !important;
      color: #000 !important; /* Black prints faster:
                                 http://www.sanbeiji.com/archives/953 */
      box-shadow: none !important;
      text-shadow: none !important;
  }
  a,
  a:visited {
      text-decoration: underline;
  }

  a[href]:after {
      content: " (" attr(href) ")";
  }

  abbr[title]:after {
      content: " (" attr(title) ")";
  }

  /*
   * Don't show links that are fragment identifiers,
   * or use the `javascript:` pseudo protocol
   */

  a[href^="#"]:after,
  a[href^="javascript:"]:after {
      content: "";
  }

  pre,
  blockquote {
      border: 1px solid #999;
      page-break-inside: avoid;
  }

  /*
   * Printing Tables:
   * http://css-discuss.incutio.com/wiki/Printing_Tables
   */

  thead {
      display: table-header-group;
  }

  tr,
  img {
      page-break-inside: avoid;
  }

  img {
      max-width: 100% !important;
  }

  p,
  h2,
  h3 {
      orphans: 3;
      widows: 3;
  }

  h2,
  h3 {
      page-break-after: avoid;
  }
  a:focus,
  button:focus,
  input:focus,
  textarea:focus {
    outline: none!important;
  }
  *:focus {
    outline: none!important;
  }
}

</style>
