import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
import AuthLayout from '@/views/Pages/AuthLayout.vue';
import NotFound from '@/views/NotFoundPage.vue';

const routes = [
  // Auth Layout
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('../views/Pages/Login.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('../views/Pages/Register.vue')
      },
      {
        path: 'not-found',
        name: 'not-found',
        component: NotFound
      }
    ]
  },

  // Dashboard Layout
  {
    path: '/',
    component: DashboardLayout,
    children: [
      {
        path: '',
        redirect: '/auth/login'  // default: ke login
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: { roles: ['pengurus'] }
      },
      {
        path: 'dashboardadmin',
        name: 'Dashboard Admin',
        component: () => import('../views/Admin/DashboardAdmin.vue'),
        meta: { roles: ['admin'] }
      },
      {
        path: 'manajemenpengurus',
        name: 'Manajemen Pengurus',
        component: () => import('../views/Admin/ManajemenPengurus.vue'),
        meta: { roles: ['admin'] }
      },
      {
        path: 'addpengurus',
        name: 'addpengurus',
        component: () => import('../views/Admin/AddPengurus.vue'),
        meta: { roles: ['admin'] }

      },
      {
         path: 'addmasjid',
         name: 'addmasjid',
         component: () => import('../views/Admin/AddMasjid.vue'),
          meta: { roles: ['admin'] }
      },
      {
        path: 'transaksi',
        name: 'transaksi',
        component: () => import('../views/Pengurus/Transaksi.vue'),
        meta: { roles: ['pengurus'] }
      },
      {
        path: 'aset',
        name: 'Aset',
        component: () => import('../views/Pengurus/InputAset.vue'),
        meta: { roles: ['pengurus'] }
      },
      {
        path: 'datatransaksi',
        name: 'datatransaksi',
        component: () => import('../views/Pengurus/DataTransaksi.vue'),
        meta: { roles: ['pengurus'] }
      },
       {
        path: 'dataaset',
        name: 'Data Aset',
        component: () => import('../views/Pengurus/DataAset.vue'),
        meta: { roles: ['pengurus'] }
      },
      {
        path: 'edittransaksi/:id_transaksi',
        name: 'edittransaksi',
        component: () => import('../views/Pengurus/EditTransaksi.vue'),
        meta: { roles: ['pengurus'] }
      },
        {
        path: 'editaset/:id_aset',
        name: 'editaset',
        component: () => import('../views/Pengurus/EditAset.vue'),
        meta: { roles: ['pengurus'] }
      },
       {
        path: 'asetlama',
        name: 'Aset Lama',
        component: () => import('../views/Pengurus/AsetLama.vue'),
        meta: { roles: ['pengurus'] }
      },
      //  {
      //   path: 'dataasetlama',
      //   name: 'Data Aset Lama',
      //   component: () => import('../views/Pengurus/DataAsetLama.vue'),
      //   meta: { roles: ['pengurus'] }
      // },
      {
        path: 'laporanaktivitas',
        name: 'Laporan Aktivitas',
        component: () => import('../views/LaporanAktivitas.vue'),
        meta: { roles: ['jamaah', 'pengurus', 'admin'] }
      },
        {
        path: 'laporanaperubahanasetneto',
        name: 'Laporan Perubahan Aset Neto',
        component: () => import('../views/LaporanPerubahanAsetNeto.vue'),
        meta: { roles: ['jamaah', 'pengurus', 'admin'] }
      },
       {
        path: 'laporananeraca',
        name: 'Laporan Neraca',
        component: () => import('../views/LaporanNeraca.vue'),
        meta: { roles: ['jamaah', 'pengurus', 'admin'] }
      },
      {
        path: 'laporanaruskas',
        name: 'Laporan Arus Kas',
        component: () => import('../views/LaporanArusKas.vue'),
        meta: { roles: ['jamaah', 'pengurus', 'admin'] }
      },
      {
        path: 'laporancalk',
        name: 'Laporan CALK',
        component: () => import('../views/LaporanCALK.vue'),
        meta: { roles: ['jamaah', 'pengurus', 'admin'] }
      },
      {
        path: 'laporan-publik',
        name: 'laporan-publik',
        component: () => import('../views/LaporanPublik.vue'),
        meta: { roles: ['jamaah', 'pengurus', 'admin'] }
      },
      {
  path: 'ganti-password',
  name: 'gantipassword',
        component: () => import('../views/Pages/GantiPassword.vue')
},
      {
        path: 'icons',
        name: 'icons',
        component: () => import('../views/Icons.vue')
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('../views/Pages/UserProfile.vue')
      },
      {
        path: 'maps',
        name: 'Apa ini',
        component: () => import('../views/GoogleMaps.vue')
      },
      {
        path: 'tables',
        name: 'tables',
        component: () => import('../views/RegularTables.vue')
      }
    ]
  },

  // Catch-all
  {
    path: '*',
    redirect: '/auth/not-found'
  }
];

export default routes;
