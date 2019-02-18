<template>
  <section class="investment">
    <spinner v-if="loading"/>
    <div class="container" v-else>
      <div class="row justify-content-center mb-3">
        <div class="col-lg-7 col-md-9 col-sm-12">
          <div class="investment-content">
            <h2>
              {{ $t('homepage.topPerformingFundsTitle') }}
            </h2>
          </div>
        </div>
      </div>
      <div class="row investment-plan-segment">
        <div class="col-md-3 col-sm-6" v-for="investment in topFourInvestmentFunds" :key="investment.id">
          <div class="investment-plan shadow">
            <h4>{{ investment.name }}</h4>
            <p>{{ investment.monthlyPerformance }}%</p>
            <b-btn size="sm"
                   variant="outline-primary"
                   :to="`/investment-funds/${investment.id}`">
              {{ $t('homepage.viewButton') }}
            </b-btn>
          </div>
        </div>
      </div>
      <div class="text-center mt-5">
        <b-btn variant="primary" :to="'/investment-funds'" size="lg">
          {{ $t('homepage.viewAllButton') }}
        </b-btn>
      </div>
    </div>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Spinner from '@/components/Spinner.vue';

export default {
  data() {
    return {
      loading: false,
    };
  },
  components: {
    Spinner,
  },
  computed: {
    ...mapGetters(['investmentFunds']),
    topFourInvestmentFunds() {
      const performanceSort = (a, b) => parseFloat(b.monthlyPerformance) - parseFloat(a.monthlyPerformance);
      return this.investmentFunds.sort(performanceSort).slice(0, 4);
    },
  },
  methods: {
    ...mapActions(['fetchInvestmentFunds']),
    loadData() {
      this.loading = true;
      this.fetchInvestmentFunds().finally(() => { this.loading = false; });
    },
  },
  created() {
    this.loadData();
  },
};
</script>
<style lang="scss" scoped>
h2 {
  font-size: 1.8em;
  color: #1f61d0;
  text-transform: uppercase;
  font-family: 'Rubik-Bold';
}

.investment {
  width:100%;
  height:auto;
  padding:100px 0px;
  text-align:center;
}

.investment-content {
  color: map-get($theme-colors, primary);
}

.investment-plan {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width:100%;
  min-height:250px;
  border-radius:10px;
  padding:30px 30px;
  margin-top:30px;
}

.investment-plan h4 {
  font-size:16px;
  font-weight:bold;
  color:#666666;
}
.investment-plan p {
  font-size:1.8em;
  font-family:'Rubik-Bold';
  color:map-get($theme-colors, primary);
  margin-bottom:20px;
}
.investment-grid {
  width:100%;
  margin-top:70px;
}

@media only screen and (max-width: 560px) {
  .investment {
    padding:50px 30px !important;
  }
  .investment-plan {
    margin-top:50px;
  }
}
</style>
