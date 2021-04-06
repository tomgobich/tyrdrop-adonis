<template>
  <div class="min-h-screen bg-gray-100">
    <transition v-if="page.flash" leave-active-class="transition ease-in duration-1000" leave-class="opacity-100" leave-to-class="opacity-0">
      <div
        v-if="(page.flash.success || page.flash.error || page.flash.warning || page.flash.info)"
        class="fixed z-40"
        style="top: .5rem; right: .5rem;">
        <tyr-toast v-if="page.flash.success" variant="success" @hide="hideToast">{{ page.flash.success }}</tyr-toast>
        <tyr-toast v-if="page.flash.error" variant="error" @hide="hideToast">{{ page.flash.error }}</tyr-toast>
        <tyr-toast v-if="page.flash.warning" variant="warning" @hide="hideToast">{{ page.flash.warning }}</tyr-toast>
        <tyr-toast v-if="page.flash.info" variant="info" @hide="hideToast">{{ page.flash.info }}</tyr-toast>
      </div>
    </transition>

    <nav class="bg-white border-b border-gray-100">
      <!-- Primary Navigation Menu -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <!-- Logo -->
            <div class="flex-shrink-0 flex items-center">
              <inertia-link href="/dashboard">
                <tyr-logo></tyr-logo>
              </inertia-link>
            </div>

            <!-- Navigation Links -->
            <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
              <tyr-nav-link href="/dashboard" :active="page.currentRouteName == 'dashboard'">
                Dashboard
              </tyr-nav-link>
              <tyr-nav-link href="/paychecks" :active="page.currentRouteName == 'paychecks'">
                Paychecks
              </tyr-nav-link>
              <tyr-nav-link href="/forecast" :active="page.currentRouteName == 'forecast'">
                Forecast
              </tyr-nav-link>
              <tyr-nav-link href="/goals" :active="page.currentRouteName == 'goals'">
                Goals
              </tyr-nav-link>
              <tyr-nav-link href="/settings" :active="page.currentRouteName == 'settings'">
                Settings
              </tyr-nav-link>
            </div>
          </div>

          <!-- Settings Dropdown -->
          <div v-if="page.user" class="hidden sm:flex sm:items-center sm:ml-6">
            <div class="ml-3 relative">
              <tyr-dropdown align="right" width="48">
                <template #trigger>
                  <button class="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                    <img class="h-8 w-8 rounded-full object-cover" :src="page.user.avatar" />
                  </button>
                </template>

                <template #content>
                  <!-- Account Management -->
                  <div class="block px-4 py-2 text-xs text-gray-400">
                    Manage Account
                  </div>

                  <tyr-dropdown-link href="/user/profile">
                    Profile
                  </tyr-dropdown-link>

                  <tyr-dropdown-link href="/balances/start" :active="page.currentRouteName == 'balances.start'">
                    Starting Balances
                  </tyr-dropdown-link>

                  <div class="border-t border-gray-100"></div>

                  <!-- Authentication -->
                  <form @submit.prevent="logout">
                    <tyr-dropdown-link as="button">
                      Logout
                    </tyr-dropdown-link>
                  </form>
                </template>
              </tyr-dropdown>
            </div>
          </div>
          <div v-else class="hidden sm:flex sm:items-center sm:ml-6">
            <a href="/login" class="mr-6">Login</a>
            <tyr-button href="/register" out>Register</tyr-button>
          </div>

          <!-- Hamburger -->
          <div class="-mr-2 flex items-center sm:hidden">
            <button @click="showingNavigationDropdown = ! showingNavigationDropdown" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
              <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path :class="{'hidden': showingNavigationDropdown, 'inline-flex': ! showingNavigationDropdown }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path :class="{'hidden': ! showingNavigationDropdown, 'inline-flex': showingNavigationDropdown }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Responsive Navigation Menu -->
      <div :class="{'block': showingNavigationDropdown, 'hidden': ! showingNavigationDropdown}" class="sm:hidden">
        <div class="pt-2 pb-3 space-y-1">
          <tyr-responsive-nav-link href="/dashboard" :active="page.currentRouteName == 'dashboard'">
              Dashboard
          </tyr-responsive-nav-link>
          <tyr-responsive-nav-link href="/paychecks" :active="page.currentRouteName == 'paychecks'">
            Paychecks
          </tyr-responsive-nav-link>
          <tyr-responsive-nav-link href="/forecast" :active="page.currentRouteName == 'forecast'">
            Forecast
          </tyr-responsive-nav-link>
          <tyr-responsive-nav-link href="/goals" :active="page.currentRouteName == 'goals'">
            Goals
          </tyr-responsive-nav-link>
          <tyr-responsive-nav-link href="/Settings" :active="page.currentRouteName == 'Settings'">
            Settings
          </tyr-responsive-nav-link>
        </div>

        <!-- Responsive Settings Options -->
        <div v-if="page.user" class="pt-4 pb-1 border-t border-gray-200">
          <div class="flex items-center px-4">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" :src="page.user.avatar" />
            </div>

            <div class="ml-3">
              <div class="font-medium text-base text-gray-800">{{ page.user.email }}</div>
            </div>
          </div>

          <div class="mt-3 space-y-1">
            <tyr-responsive-nav-link href="/user/profile" :active="page.currentRouteName == 'profile.show'">
              Profile
            </tyr-responsive-nav-link>

            <tyr-responsive-nav-link href="/balances/start" :active="page.currentRouteName == 'balances.start'">
              Starting Balances
            </tyr-responsive-nav-link>

            <!-- Authentication -->
            <form method="POST" @submit.prevent="logout">
              <tyr-responsive-nav-link as="button">
                Logout
              </tyr-responsive-nav-link>
            </form>
          </div>
        </div>
        <div v-else class="pt-4 pb-1 border-t border-gray-200 flex flex-column w-full">
          <a href="/login" class="mr-6">Login</a>
          <tyr-button href="/register" out>Register</tyr-button>
        </div>
      </div>
    </nav>

    <!-- Page Heading -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <slot name="header"></slot>
      </div>
    </header>

    <!-- Page Content -->
    <main>
      <slot></slot>
    </main>

    <!-- Modal Portal -->
    <div id="modalPortal"></div>
  </div>
</template>

<script>
import TyrLogo from '../Components/Logo.vue'
import TyrToast from '../Components/Toast.vue'
import TyrNavLink from '../Components/NavLink.vue'
import TyrResponsiveNavLink from '../Components/ResponsiveNavLink.vue'
import TyrDropdown from '../Components/Dropdown.vue'
import TyrDropdownLink from '../Components/DropdownLink.vue'
import TyrButton from '../Components/Button.vue'

export default {
  props: {
    page: Object
  },
  
  components: { 
    TyrLogo,
    TyrToast,
    TyrNavLink,
    TyrResponsiveNavLink,
    TyrDropdown,
    TyrDropdownLink,
    TyrButton
  },
  
  data() {
    return {
      showingNavigationDropdown: false,
      flashShow: true,
    }
  },

  mounted() {
    this.toastTimeout = setTimeout(() => this.hideToast(), 8500)
  },

  watch: {
    'page.flash': {
      deep: true,
      handler() {
        clearTimeout(this.toastTimeout)
        this.toastTimeout = setTimeout(() => this.hideToast(), 8500)
      }
    }
  },

  methods: {
    hideToast() {
      clearTimeout(this.toastTimeout)
      this.page.flash = {}
    },

    async logout() {
      await this.$inertia.post('/logout')
    }
  },
};
</script>