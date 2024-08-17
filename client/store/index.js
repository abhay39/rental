import { configureStore } from '@reduxjs/toolkit'
import UserInformation from './userStore'

const RentalRedux=configureStore({
    reducer:{
        userDetails:UserInformation.reducer
    }
})

export default RentalRedux