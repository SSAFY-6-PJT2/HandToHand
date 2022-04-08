/**
 * @author Hyeonsooryu
 */

import Vue from 'vue';
import Router from 'vue-router';
import Index from './pages/Index.vue';
import NftGallery from './pages/NftGallery.vue';
import NftDetail from './pages/NftDetail.vue';
import Profile from './pages/Profile.vue';
import MainNavbar from './layout/MainNavbar.vue';
import MainFooter from './layout/MainFooter.vue';
import MyNft from './pages/components/MyNft.vue';
import DonationHistory from './pages/components/DonationHistory.vue';
// 404 Page Not Found
import PageNotFound from './pages/PageNotFound.vue';

Vue.use(Router);

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'index',
      components: { default: Index, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' },
      },
    },
    {
      path: '/nft-gallery',
      name: 'nft-gallery',
      components: {
        default: NftGallery,
        header: MainNavbar,
        footer: MainFooter,
      },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' },
      },
    },
    {
      path: '/profile',
      name: 'profile',
      components: { default: Profile, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' },
      },
      children: [
        { path: 'my-nft', component: MyNft },
        { path: 'donation-history', component: DonationHistory },
      ],
    },
    {
      path: '/nft-detail/:token_id',
      name: 'nft-detail',
      components: {
        default: NftDetail,
        header: MainNavbar,
        footer: MainFooter,
      },
      props: {
        header: { colorOnScroll: 0 },
        footer: { backgroundColor: 'black' },
      },
    },
    // 404 Page Not Found
    {
      path: '*',
      redirect: '/404',
    },
    {
      path: '/404',
      component: PageNotFound,
    },
  ],
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});
