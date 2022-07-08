import { createRouter, createWebHashHistory} from 'vue-router'
import AdminLogin from '../components/AdminLogin.vue'
import AdminIndex from '@/components/AdminIndex.vue'
const routes = [  
    { path: '/',  component: AdminLogin  },
    { path:'/index',component:
        AdminIndex
    }
]
const router = createRouter({  
    history: createWebHashHistory(),  
    routes
})

export default router
