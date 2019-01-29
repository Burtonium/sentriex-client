<template>
  <section class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="footer-widget">
            <h4>Products</h4>
            <ul>
              <li><router-link :to="'/investment-funds-info'">Investment Funds</router-link></li>
              <li><a href="#">Exchange (Coming Soon)</a></li>
              <li>
                <router-link :to="{ name: 'contact', query: { otc: true } }">
                  OTC
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="footer-widget">
            <h4>Learn</h4>
            <ul>
              <li><a href="#">Crypto Market Reports</a></li>
            </ul>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="footer-widget">
            <h4>Company</h4>
            <ul>
              <li><router-link :to="'/vision'">Vision</router-link></li>
              <li><a href="#">Legal and Privacy</a></li>
              <li><router-link :to="'/about'">Contact</router-link></li>
            </ul>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="footer-widget">
            <h4>Social</h4>
            <ul>
              <li class="flex center">
                <a class="mx-2" target="_blank" href="https://twitter.com/TheSentriex">
                  <icon name="brands/twitter" />
                </a>
                <a class="mx-2" target="_blank" href="https://discord.gg/tSrm67c">
                  <icon name="brands/discord" />
                </a>
                <a class="mx-2" target="_blank" href="https://t.me/Sentriex">
                  <icon name="brands/telegram" />
                </a>
              </li>
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
  padding-top:10px;
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
.flex {
  display: flex;
}
.flex.center {
  justify-content: center;
}
</style>
