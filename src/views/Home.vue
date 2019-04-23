<template>
  <div class="home">
    <section class="banner" :class="{ expanded: visionExpanded }">
      <div class="banner-wraper">
        <div class="banner-container">
          <div class="banner-content">
            <h2 class="banner-title capitalized">
              {{ $t('homepage.title') }}
            </h2>
            <b-collapse id="collapse-1" class="mb-4 mt-3" v-model="visionExpanded">
              <h4 class="banner-sub-title" v-html="$t('homepage.visionHtml')">
              </h4>
            </b-collapse>
            <div class="buttons mt-4">
              <b-btn v-b-toggle.collapse-1 variant="outline-light">
                {{ $t('footer.vision') }}
              </b-btn>
              <b-btn variant="outline-light" :to="'/how-it-works'">
                {{ $t('homepage.howItWorksButton') }}
              </b-btn>
              <b-btn variant="outline-light" :to="'/register'">
                {{ $t('homepage.getStartedButton') }}
              </b-btn>
            </div>
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
                <img src="../assets/images/feature-img.png" alt="" />
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <div class="mission-content">
              <h2>
                {{ $t('homepage.ourMissionTitle') }}
              </h2>
              <p>
                {{ $t('homepage.ourMissionDescription') }}
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
            <h2>
              {{ $t('homepage.howItWorksTitle') }}
            </h2>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 col-sm-6 col-xs-12">
            <div class="module_box shadow-lg">
              <img src="../assets/images/icon1.png" alt="" />
              <h3>
                {{ $t('homepage.createAnAccount') }}
              </h3>
            </div>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <div class="module_box shadow-lg">
              <img src="../assets/images/icon2.png" alt="" />
              <h3>
                {{ $t('homepage.fundYourAccount') }}
              </h3>
            </div>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <div class="module_box shadow-lg">
              <img src="../assets/images/icon3.png" alt="" />
              <h3>
                {{ $t('homepage.startInvesting') }}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="portfolio-features">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 ccol-sm-10 col-xs-12 section-heading">
            <h2>
              {{ $t('homepage.portfolioSectionTitle') }}
            </h2>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-sm-12">
            <div class="features-items">
              <div class="feature-item-module row">
                <div class="col-lg-3 col-sm-12 ">
                  <div class="module-icon">
                    <icon name="fire-extinguisher" class="feature-icon" />
                  </div>
                </div>
                <div class="col-lg-9 col-sm-12">
                  <div class="module-text">
                    <h4>
                      {{ $t('homepage.manageRiskTitle') }}
                    </h4>
                    <p>
                      {{ $t('homepage.manageRiskDescription') }}
                    </p>
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
                    <h4>
                      {{ $t('homepage.managePortfolioTitle') }}
                    </h4>
                    <p>
                      {{ $t('homepage.managePortfolioDescription') }}
                    </p>
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
                    <h4>
                      {{ $t('homepage.referralIncentivesTitle') }}
                    </h4>
                    <p>
                      {{ $t('homepage.referralIncentivesDescription') }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-sm-12 vertical-center">
            <div class="screenshot-showcase">
              <img src="../assets/images/fund_screenshot.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <mailer-subscribe-form />
  </div>
</template>
<script>
import TopPerformingFunds from '@/components/TopPerformingFunds.vue';
import MailerSubscribeForm from '@/components/MailerSubscribeForm.vue';

export default {
  name: 'home',
  components: {
    TopPerformingFunds,
    MailerSubscribeForm,
  },
  data() {
    return {
      visionExpanded: false,
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

.buttons {
  display: flex;
  justify-content: center;
}

.buttons > * {
  margin: 0 20px;
}


/*Banner section*/
.banner {
  width:100%;
  height: 700px;
  background:url("../assets/images/banner-bg.png");
  background-size:cover;
  background-repeat:no-repeat;
  background-position:center center;
  position:relative;
  transition: all 0.4s;
}

.banner.expanded {
  height: 1000px;
}

@media(max-width: 1080px) {
  .banner.expanded {
    height: 900px;
  }
}

@media(max-width: 768px) {
  .banner {
    height: 550px;
  }
  .banner.expanded {
    height: 1000px;
  }
}

@media(max-width: 600px) {
  .banner.expanded {
    height: 1200px;
  }
}


@media(max-width: 480px) {
  .banner-title {
    font-size: 1.2em;
  }
  .banner-sub-title {
    font-size: 1em;
  }

  .banner.expanded {
    height: 1350px;
  }

  .buttons {
    flex-direction: column;

    .btn {
      margin-bottom: 10px;
    }
  }
}

@media(max-width: 400px) {
  .banner-title {
    font-size: 1.1em;
  }
  .banner-sub-title {
    font-size: 0.9em;
  }
}

@media(max-width: 300px) {
  .banner-title {
    font-size: 1em;
  }
  .banner-sub-title {
    font-size: 0.8em;
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
  background:url(../assets/images/banner-wave.png);
  background-repeat:no-repeat;
  background-size:contain;
  background-position:bottom center;
}

.banner-container {
  padding-left: 15px;
  padding-right: 15px;
  max-width: 968px;
  margin: 0 auto;
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

@media(max-width: 1023px) {
  .banner-content {
    padding-top: 30px;
  }
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
  background:url(../assets/images/subscription-bg.png);
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

.module-icon {
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

.vertical-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.screenshot-showcase {
  box-shadow: 0px 0px 12px 1px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  padding: 15px;
}

.screenshot-showcase img {
  width: 100%;
  margin-bottom: 47px;
}

.box-shadow {
  box-shadow: 0px 0px 12px 1px rgba(0, 0, 0, 0.2);
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

@media print {
  *,
  *:before,
  *:after,
  *:first-letter,
  *:first-line {
      background: transparent !important;
      color: #000 !important;
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
