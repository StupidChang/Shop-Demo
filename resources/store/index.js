// src/store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    users: [
      { id: 1, name: '訪客1', count: 0, cart: [] },
      { id: 2, name: '訪客2', count: 0, cart: [] },
      { id: 3, name: '訪客3', count: 0, cart: [] }
    ],
    currentUser: null,
    highlightedUser: null
  },
  mutations: {
    SET_USER(state, changuser) {
        state.users[changuser.id - 1] = changuser;
    },
    SET_CURRENT_USER(state, user) {
        state.currentUser = user;
        console.log('currentUser:', state.currentUser);
        //console.log('highlightedUser:', state.highlightedUser);
    },
    HIGHLIGHT_USER(state, user) {
        state.highlightedUser = user;
        //console.log('setting.highlightedUser:', state.highlightedUser);
    },
    INCREMENT_USER_COUNT(state, userId) {
        const user = state.users.find(u => u.id === userId);

        if (user) {
            user.count += 1;
            //console.log('INCREMENT_USER_COUNT:', user);
        }
    },
    SET_USER_CART(state, { userId, cartItems }) {
        console.log('SET_USER_CART.currentUser:', state.currentUser);
        console.log('SET_USER_CART.highlightedUser:', state.highlightedUser);
        console.log('SET_USER_CART.users:', state.users);
        const user = state.users.find(u => u.id === userId);
        if (user) {
            user.cart = cartItems;
        }
    },
    UPDATE_USER_COUNTT(state, userId, count) {
        const user = state.users.find(u => u.id === userId);
        if (user) {
            user.count = count;
        }
    },
    COMSOLE_USER(state) {
        console.log('Now.currentUser:', state.currentUser);
        console.log('Now.highlightedUser:', state.highlightedUser);
        console.log('Now.users:', state.users);
    },
    REMOVE_ITEM_FROM_CART(state, { userId, cartItems }) {
        //console.log("state.currentUser: ", state.currentUser)
        //console.log('state.users: ', state.users);

        const user = state.users.find(user => user.id === userId);
        console.log("REMOVE_ITEM_FROM_CART.user: ", user)
        console.log('cartItems: ', cartItems);
        console.log("REMOVE_ITEM_FROM_CART.cartItems.id: ", cartItems[0].id)
        const itemIndex = user.cart.findIndex(item => item.id === cartItems[0].id);
        console.log("REMOVE_ITEM_FROM_CART.itemIndex: ", itemIndex)
        if (itemIndex !== -1) {
            //console.log("user.cart.spliceBefore: ", user.cart)
            user.cart.splice(itemIndex, 1); // 直接從購物車移除該項目
            //state.currentUser.cart.splice(itemIndex, 1);
            //console.log("user.cart.spliceAfter: ", user.cart)
            state.currentUser = user;
            console.log('REMOVE_ITEM_FROM_CART.currentUser:', state.currentUser);
            console.log('REMOVE_ITEM_FROM_CART.highlightedUser:', state.highlightedUser);
            console.log('REMOVE_ITEM_FROM_CART.users:', state.users);
        }
    },
  },
  actions: {
    getAlluser({ state }) {
        if(localStorage.getItem('user_1') != null){
            state.users[0] = JSON.parse(localStorage.getItem('user_1'));
            console.log("getAlluser.user_1 is not null: ", JSON.parse(localStorage.getItem('user_1')));
        }
        if(localStorage.getItem('user_2') != null){
            state.users[1] = JSON.parse(localStorage.getItem('user_2'));
            console.log("getAlluser.user_2 is not null: ", JSON.parse(localStorage.getItem('user_2')));
        }
        if(localStorage.getItem('user_3') != null){
            state.users[2] = JSON.parse(localStorage.getItem('user_3'));
            console.log("getAlluser.user_3 is not null: ", JSON.parse(localStorage.getItem('user_3')));
        }
        console.log("getAlluser: ", state.users);
    },
    changeUser({ commit, dispatch, state  }, {currentUser, highlightedUser}) {
        console.log('In changeUser');
        if (highlightedUser) {
            if(currentUser != highlightedUser){
                //console.log('changeUser.currentUser:', state.currentUser);
                //console.log('changeUser.highlightedUser:', state.highlightedUser);
                localStorage.setItem('user_' + currentUser.id, JSON.stringify(currentUser)); //儲存於資料庫同時保存本地資料
                dispatch('getSavedUser', state.highlightedUser); // 使用 dispatch 调用
                //commit('SET_CURRENT_USER', highlightedUser);
                commit('SET_USER', currentUser);
            }
        } else {
            console.error('Highlighted user is undefined');
            //console.log('changeUser.currentUser:', currentUser);
            //console.log('changeUser.highlightedUser:', highlightedUser);
        }
    },
    highlightUser({ commit }, user) {
        commit('HIGHLIGHT_USER', user);
        //console.log('pick.highlightedUser:', user);
        //commit('COMSOLE_USER');
    },
    incrementUserCount({ commit }, userId) {
        //console.log('incrementUserCount:', userId);
        commit('INCREMENT_USER_COUNT', userId);
    },
    getSavedUser({ commit, state }, user) {
        console.log('In getSavedUser');
        console.log("getSavedUser.FirstUserData:", user)
        //console.log("getSavedUser.NowCurrent:", state.currentUser)
        if(user == null){
            console.log("1111111111111")
            if(state.currentUser != null){
                const savedUser = localStorage.getItem('user_'+ state.currentUser.id);
                //console.log("getSavedUser.savedUser:", savedUser)
                const tempuser = savedUser ? JSON.parse(savedUser) : this.state.users[state.currentUser.id - 1];
                commit('SET_CURRENT_USER', tempuser);
                commit('HIGHLIGHT_USER', tempuser);
                commit('COMSOLE_USER');
            }
            else{
                const savedUser = localStorage.getItem('user_1');
                const tempuser = savedUser ? JSON.parse(savedUser) : this.state.users[0];
                //console.log('User:', tempuser);
                commit('SET_CURRENT_USER', tempuser);
            }
        }
        else if(typeof user === "string"){

            const savedUser = localStorage.getItem(user);
            console.log('getSavedUserAfteruser: ', savedUser);
            const tempuser = savedUser ? JSON.parse(savedUser) : this.state.users[user.id - 1];
            console.log('getSavedUserAfteruser: ', tempuser);
            commit('SET_CURRENT_USER', tempuser);
        }
        else{
            console.log("222222222222")
            //console.log("getSavedUser.FirstUserData2:", user)
            const savedUser = localStorage.getItem('user_'+ user.id);
            const tempuser = savedUser ? JSON.parse(savedUser) : this.state.users[user.id - 1];
            console.log('AfterChangUserData: ', tempuser);
            console.log('State.current: ', state.currentUser);
            commit('SET_CURRENT_USER', tempuser);
            console.log('State.After.current: ', state.currentUser);
            //commit('COMSOLE_USER');
        }
    },
    saveUserBasket({ commit, state }, { userId, cartItems }) {
        //console.log('saveUserBasket_userid:', userId);
        const user = state.users.find(u => u.id === userId);
        if (user) {
            commit('SET_USER_CART', { userId, cartItems });
            //localStorage.setItem('user_' + userId, JSON.stringify({ ...user, cart: cartItems }));
            localStorage.setItem('user_' + userId, JSON.stringify({ ...user, cart: cartItems }));
        }
    },
    removeUserBasket({ commit, state }, { userId, cartItems }) {
        const user = state.users.find(u => u.id === userId);
        if (user) {
            commit('REMOVE_ITEM_FROM_CART', { userId, cartItems });
            localStorage.setItem('user_' + userId, JSON.stringify(user)); // 更新本地存儲的用戶資料
        }
    },
    consoleUser({ commit }) {
        //commit('COMSOLE_USER');
    },
  },
  getters: {
    getUsers(state) {
        return state.users;
    },
    getCurrentUser(state) {
        return state.currentUser;
    },
    gethighlightedUser(state) {
        return state.highlightedUser;
    }
  }
});
