import { DELETE_PRODUCT_ASYNC, GET_ALL_PRODUCT_ASYNC, ADD_PRODUCT_ASYNC, EDIT_PRODUCT_ASYNC, BUTTON_LOADER_END, BUTTON_LOADER_SATRT } from "../type"

const initialState = {
    product_list: [],
    button_loader: false
}

const productReducer = (state = initialState, action) => {

    switch (action.type) {

        case BUTTON_LOADER_SATRT:
            return {...state, button_loader: action.payload }

        case BUTTON_LOADER_END:
            return {...state, button_loader: action.payload }

        case ADD_PRODUCT_ASYNC:
            const list = [ action.payload, ...state.product_list  ]           
            return { ...state, product_list: list }

        case GET_ALL_PRODUCT_ASYNC:
            return { ...state, product_list: action.payload }

        case EDIT_PRODUCT_ASYNC:
            const editData = action.payload           
            let {product_list} = state
            
            product_list.map((x, i) => {
                if(x.product_id == editData.product_id){
                    x.product_name = editData.product_name
                    x.product_image = editData.product_image
                    x.product_price = editData.product_price
                    x.product_offerprice = editData.product_offerprice
                }
            })
            return { ...state, product_list: product_list }

        case DELETE_PRODUCT_ASYNC:
            const filterdata = state.product_list.filter( (x,i) =>  x.product_id !== action.payload.product_id  )
            return { ...state, product_list: filterdata}

        default:
            return state
    }
}

export { productReducer }