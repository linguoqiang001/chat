import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login/Login'
import Index from '../components/Index/Index'
import Message from '../components/Message/Message'
import Dialogue from '../components/Dialogue/Dialogue'
import Contact from '../components/Contact/Contact'
import Dynamic from '../components/Dynamic/Dynamic'
import PersonIndex from '../components/PersonIndex/PersonIndex'
import Add from '../components/Add/Add'
import ConfirmAdd from '../components/ConfirmAdd/ConfirmAdd'
import Register from '../components/Register/Register'

Vue.use(Router)

let indexChildren = [
  {
    path: '/',
    redirect: {
      name: 'Message'
    }
  },
  {
    path: '/Message',
    name: 'Message',
    component: Message
  },
  {
    path: '/Contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/Dynamic',
    name: 'Dynamic',
    component: Dynamic
  }
]
export default new Router({
  routes: [
    {
      path: '/Dialogue',
      name: 'Dialogue',
      component: Dialogue
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Index',
      component: Index,
      children: indexChildren
    },
    {
      path: '/PersonIndex',
      name: 'PersonIndex',
      component: PersonIndex
    },
    {
      path: '/Add',
      name: 'Add',
      component: Add
    },
    {
      path: '/ConfirmAdd',
      name: 'ConfirmAdd',
      component: ConfirmAdd
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    }
  ]
})
