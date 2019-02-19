<template>
  <requires-async-state :actions="actionDependencies">
    <div class="header-flex">
      <h4 class="text-primary mb-4">
        {{ $t('referrals.paymentsTitle') }}
      </h4>
      <div>
        <b-dropdown id="currency-filter"
                    variant="outline-primary"
                    size="sm"
                    :text="currencyFilter"
                    class="mb-2 mr-2"
                    v-if="displayType !== CURRENCY_TOTALS">
          <b-dropdown-item @click="currencyFilter = 'All'">
            {{ $t('general.all') }}
          </b-dropdown-item>
          <b-dropdown-item @click="currencyFilter = currency.code"
                           v-for="currency in currencies"
                           :key="currency.code">
            {{ currency.code }}
          </b-dropdown-item>
        </b-dropdown>
        <b-dropdown id="display-type"
                    variant="outline-primary"
                    size="sm"
                    :text="$t(`referrals.displayTypes.${displayType}`)"
                    class="mb-2">
          <b-dropdown-item @click="displayType = HISTORY">
            {{ $t('referrals.historical') }}
          </b-dropdown-item>
          <b-dropdown-item @click="displayType = USER_TOTALS">
            {{ $t('referrals.userTotals') }}
          </b-dropdown-item>
          <b-dropdown-item @click="displayType = CURRENCY_TOTALS">
            {{ $t('referrals.currencyTotals') }}
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <b-table :items="referralPaymentList"
             stacked="md"
             :show-empty="true"
             :fields="tableFields"
             :empty-text="$t('referrals.noPayments')"
             :current-page="currentPage"
             :per-page="perPage">
      <template slot="created" slot-scope="row">
        <timeago :datetime="row.item.created" :locale="locale" />
      </template>
    </b-table>
    <div class="row" v-if="referralPaymentList.length > perPage">
      <div class="col-md-6 my-1">
        <b-pagination :total-rows="referralPaymentList.length"
                      :per-page="perPage"
                      v-model="currentPage"
                      class="my-0"/>
      </div>
    </div>
  </requires-async-state>
</template>
<script>
import BigNumber from 'bignumber.js';
import RequiresAsyncState from '@/components/RequiresAsyncState.vue';
import { mapGetters } from 'vuex';
import uniq from 'lodash.uniq';

export default {
  data() {
    return {
      displayType: 'history',
      currencyFilter: 'BTC',
      perPage: 5,
      currentPage: 1,
    };
  },
  components: {
    RequiresAsyncState,
  },
  computed: {
    actionDependencies() {
      return ['fetchReferralPayments', 'fetchCurrencies'];
    },
    ...mapGetters(['referralPayments', 'currencies', 'locale']),
    historicalList() {
      return this.referralPayments && this.referralPayments.map((p) => {
        const currency = this.currencies[p.currencyCode];
        return {
          referral: p.payer.username,
          amount: currency.format(p.amount),
          created: p.createdAt,
        };
      });
    },
    historialFields() {
      return {
        referral: {
          label: this.$t('referrals.referral'),
        },
        amount: {
          label: this.$t('general.amount'),
        },
        created: {
          label: this.$t('general.created'),
        }
      }
    },
    currencyFilteredReferralPayments() {
      return this.referralPayments && this.referralPayments.filter(this.byCurrency);
    },
    userTotalsList() {
      const refPay = this.currencyFilteredReferralPayments;
      const users = uniq(refPay.map(p => p.payer.username));
      const currencies = uniq(refPay.map(p => p.currencyCode)).map(c => this.currencies[c]);
      const byUser = u => ({ payer }) => payer.username === u;
      const byCurrency = code => ({ currencyCode }) => code === currencyCode;
      const userPaymentTotals = [];

      users.forEach((u) => {
        currencies.forEach((c) => {
          const paymentTotal = refPay
            .filter(byUser(u))
            .filter(byCurrency(c.code))
            .reduce((acc, { amount }) => acc.plus(amount), new BigNumber(0));

          userPaymentTotals.push({
            referral: u,
            paymentTotal: c.format(paymentTotal),
          });
        });
      });

      return userPaymentTotals;
    },
    userTotalsFields() {
      return {
        referral: {
          label: this.$t('referrals.referral'),
        },
        paymentTotal: {
          label: this.$t('referrals.paymentTotal'),
        }
      }
    },
    currencyTotals() {
      const refPay = this.currencyFilteredReferralPayments;
      const currencies = uniq(refPay.map(p => p.currencyCode)).map(c => this.currencies[c]);

      return currencies.map((c) => {
        const paymentTotal = refPay
          .filter(this.byCurrency)
          .reduce((acc, { amount }) => acc.plus(amount), new BigNumber(0));

        return {
          currency: c.label,
          paymentTotal: c.format(paymentTotal),
        };
      });
    },
    currencyTotalsFields() {
      return {
        currency: {
          label: this.$t('general.currency'),
        },
        paymentTotal: {
          label: this.$t('referrals.paymentTotal'),
        }
      }
    },
    referralPaymentList() {
      const mapped = {
        user: this.userTotalsList,
        history: this.historicalList,
        currency: this.currencyTotals,
      };
      return mapped[this.displayType];
    },
    tableFields() {
      const mapped = {
        user: this.userTotalsFields,
        history: this.historialFields,
        currency: this.currencyTotalsFields,
      };
      return mapped[this.displayType];
    },
    USER_TOTALS: () => 'user',
    HISTORY: () => 'history',
    CURRENCY_TOTALS: () => 'currency',
  },
  methods: {
    byCurrency({ currencyCode }) {
      return this.currencyFilter === 'All' || this.currencyFilter === currencyCode;
    },
  },
};
</script>
