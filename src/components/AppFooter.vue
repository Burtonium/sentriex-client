<template>
  <section class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="footer-logo">
            <img src="img/lgo-footer.png" alt="" />
          </div>
        </div>
        <div class="col-md-2 col-sm-6 col-xs-12">
          <div class="footer-widget">
            <h4> Products </h4>
            <ul>
              <li><a href="#"> Sit amet</a></li>
              <li><a href="#"> Architecto</a></li>
              <li><a href="#"> Consectetur</a></li>
              <li><a href="#"> Minima</a></li>
              <li><a href="#"> Reprehenderit </a></li>
            </ul>
          </div>
        </div>
        <div class="col-md-2 col-sm-6 col-xs-12">
          <div class="footer-widget">
            <h4> Service </h4>
            <ul>
              <li><a href="#"> Sit amet</a></li>
              <li><a href="#"> Architecto</a></li>
              <li><a href="#"> Consectetur</a></li>
              <li><a href="#"> Minima</a></li>
              <li><a href="#"> Reprehenderit </a></li>
            </ul>
          </div>
        </div>
        <div class="col-md-2 col-sm-6 col-xs-12">
          <div class="footer-widget">
            <h4> Useful links </h4>
            <ul>
              <li><a href="#"> Sit amet</a></li>
              <li><a href="#"> Architecto</a></li>
              <li><a href="#"> Consectetur</a></li>
              <li><a href="#"> Minima</a></li>
              <li><a href="#"> Reprehenderit </a></li>
            </ul>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="footer-widget">
            <h4> Others </h4>
            <ul>
              <li><a href="#"> Sit amet</a></li>
              <li><a href="#"> Architecto</a></li>
              <li><a href="#"> Consectetur</a></li>
              <li><a href="#"> Minima</a></li>
              <li><a href="#"> Reprehenderit </a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="footer-copyright">
            <p> copyright &copy; sentriex.com 2018 | All right reserved</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'app-footer'
}
</script>

<style lang="scss" scoped>
.footer {
  width:100%;
  height:auto;
  background:#2d3138;
  padding:80px 0px 20px 0px;
}
.footer-widget h4 {
  color:#ffffff;
}

.footer-widget ul {
  padding-top:20px;
}
.footer-widget ul li a{
  color:#ffffff;
}
.footer-copyright  {
  width:100%;
  text-align:center;
  color:#ffffff;
  font-size:13px;
  padding:50px 0px 0px 0px;
}
@media only screen and (max-width: 768px) {
  .footer-widget {
    text-align:center;
  }
}
@media only screen and (max-width: 560px) {
  .footer-widget {
    padding-top:30px;
    text-align:center;
  }
  .footer-logo {
    text-align:center;
    margin-bottom:20px;
  }
}
</style>
