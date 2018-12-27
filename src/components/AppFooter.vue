<template>
  <section class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="footer-widget">
            <h4>Products</h4>
            <ul>
              <li><router-link :to="'/investment-funds'">Investment Funds</router-link></li>
              <li><a href="#">Savings Account</a></li>
              <li><a href="#">Exchange</a></li>
              <li><a href="#">OTC</a></li>
            </ul>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="footer-widget">
            <h4>Learn</h4>
            <ul>
              <li><a href="#">Buy Cryptocurrencies</a></li>
              <li><a href="#">Investing and Managing Funds</a></li>
              <li><a href="#">Country Availability</a></li>
              <li><a href="#">Crypto Market Reports</a></li>
            </ul>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="footer-widget">
            <h4>Company</h4>
            <ul>
              <li><a href="#">Vision</a></li>
              <li><router-link :to="'/about'">About</router-link></li>
              <li><a href="#">Road Map</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Legal and Privacy</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="footer-widget">
            <h4>Social</h4>
            <ul>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Discord</a></li>
              <li><a href="#">Telegram</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-lg-12">
          <div class="footer-copyright">
            <p>Copyright &copy; sentriex.com 2018 | All right reserved</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'app-footer',
};
</script>

<style lang="scss" scoped>
.footer {
  width:100%;
  height:auto;
  background:#2d3138;
  padding:30px 0px 20px 0px;
}

.footer-widget {
  & li {
    margin: 0 3px;
    font-size: 14px;
  }
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
}
</style>
