import axios, {setClientToken, removeClientToken} from '@utils/axios';
import {isEmpty} from '@utils/functions';

const FoodService = {
  promotion: function (country, cityName) {
    return axios
      .get(`/location/promotion/${country}/${cityName}`)
      .then(response => {
        return response.data;
      });
  },
  popular: function (country, cityName) {
    return axios
      .get(`/location/popular/${country}/${cityName}`)
      .then(response => {
        return response.data;
      });
  },
  all: function (country, cityName) {
    return axios.get(`/location/${country}/${cityName}`).then(response => {
      return response.data;
    });
  },
  result: function (country, cityName, search, filters) {
    return axios
      .post(`/location/home/search`, {
        lang: country,
        location: cityName,
        searchString: search,
        filters,
      })
      .then(response => {
        return response.data;
      });
  },
  getPromotionHeader: function (country, locationId) {
    return axios
      .post('/promotion/header', {
        locationId: locationId,
        lang: country,
      })
      .then(response => {
        return response.data;
      });
  },
  getDailyMenu: function (country, locationId) {
    return axios
      .post('/product/daily-menu', {
        locationId: locationId,
        lang: country,
      })
      .then(response => {
        return response.data;
      });
  },

  getRestaurantInfo: function (country, restaurantId) {
    return axios
      .get('/restaurant/' + country + '/' + restaurantId)
      .then(response => {
        return response.data;
      });
  },

  categories: function (country, restaurantId) {
    return axios
      .post(`/product/category`, {
        restaurantSecretCode: restaurantId,
        lang: country,
      })
      .then(response => {
        return response.data;
      });
  },
  subCategories: function (country, restaurantId, categoryId) {
    return axios
      .post(`/product/subcategories`, {
        restaurantSecretCode: restaurantId,
        lang: country,
        categoryId,
      })
      .then(response => {
        return response.data;
      });
  },
  products: function (
    country,
    restaurantId,
    categoryId,
    subcategoryId,
    propertyValTransId,
    searchedProduct,
  ) {
    return axios
      .post(`/product/subcategories-products`, {
        restaurantSecretCode: restaurantId,
        lang: country,
        subcategoryId,
        propertyValTransId,
        categoryId,
        searchProduct: searchedProduct,
      })
      .then(response => {
        return response.data;
      });
  },
  information: function (country, restaurantName) {
    return axios
      .get(`/restaurant/info/${country}/${restaurantName}`)
      .then(response => {
        return response.data;
      });
  },
  reviews: function (restaurantName, rating) {
    return axios
      .post(`/restaurant/review-list`, {
        restaurantSecretCode: restaurantName,
        rating,
      })
      .then(response => {
        return response.data;
      });
  },

  required: function (country, restaurantId, variantId) {
    return axios
      .post(`/product/required-extra`, {
        restaurantSecretCode: restaurantId,
        lang: country,
        variantId,
      })
      .then(response => {
        return response.data;
      });
  },

  optional: function (country, restaurantId, variantId) {
    return axios
      .post(`/product/optional-extra-new`, {
        restaurantSecretCode: restaurantId,
        lang: country,
        variantId,
      })
      .then(response => {
        return response.data;
      });
  },

  sauces: function (country, restaurantId, variantId) {
    return axios
      .post(`/product/sauces`, {
        restaurantSecretCode: restaurantId,
        lang: country,
        variantId,
      })
      .then(response => {
        return response.data;
      });
  },

  getOrders: function (token) {
    setClientToken(token);
    return axios.get(`/order`).then(response => {
      removeClientToken();
      return response.data;
    });
  },

  getOrder: function (token, country, orderId) {
    setClientToken(token);

    return axios.get(`/order/${country}/${orderId}`).then(response => {
      removeClientToken();
      return response.data;
    });
  },

  order: function (
    token,
    city,
    deliveryAddressId,
    restaurantId,
    take,
    cutlery,
    products,
    comment,
    deliveryPrice,
    country,
    payment,
  ) {
    setClientToken(token);

    var totalPrice = 0;

    products.map((cartProduct, key) => {
      totalPrice += cartProduct.quantity * cartProduct.productPrice;

      totalPrice += cartProduct.quantity * cartProduct.boxPrice;

      cartProduct.extras.map((extr, kk) => {
        totalPrice += extr.quantity * extr.extraPrice;
      });
    });

    var finalPrice = totalPrice + deliveryPrice;

    return axios
      .post(`/order`, {
        deliveryAddressId,
        restaurantSecretCode: restaurantId,
        take: take ? 1 : 0,
        cutlery: cutlery ? 1 : 0,
        products,
        messageCourier: comment,
        locationId: city.id,
        deliveryPrice,
        totalPrice,
        finalPrice,
        lang: country,
        payment,
      })
      .then(response => {
        removeClientToken();

        return response.data;
      });
  },
  orderWithDeliveryAddress: function (
    token,
    cityObj,
    addressStreet,
    addressHouseNumber,
    addressFloor,
    addressDoorNumber,
    restaurantId,
    take,
    cutlery,
    products,
    comment,
    deliveryPrice,
    phone,
    fullName,
    email,
    country,
    payment,
  ) {
    !isEmpty(token) && setClientToken(token);

    var totalPrice = 0;

    products.map((cartProduct, key) => {
      totalPrice += cartProduct.quantity * cartProduct.productPrice;

      totalPrice += cartProduct.quantity * cartProduct.boxPrice;

      cartProduct.extras.map((extr, kk) => {
        totalPrice += extr.quantity * extr.extraPrice;
      });
    });

    var finalPrice = totalPrice + deliveryPrice;

    return axios
      .post(`/order`, {
        restaurantSecretCode: restaurantId,
        take: take ? 1 : 0,
        cutlery: cutlery ? 1 : 0,
        products,
        messageCourier: comment,
        street: addressStreet,
        houseNumber: addressHouseNumber,
        floor: addressFloor,
        doorNumber: addressDoorNumber,
        locationId: cityObj.id,
        deliveryPrice,
        totalPrice,
        finalPrice,
        phone,
        fullName,
        email,
        lang: country,
        payment,
      })
      .then(response => {
        !isEmpty(token) && removeClientToken(token);

        return response.data;
      });
  },
  getDownSellProducts: function (restaurant_id, country) {
    return axios
      .post('/product/downsell', {
        restaurantId: restaurant_id,
        lang: country,
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return {};
      });
  },
  setCouponCodeHandle: function (token, restaurantId, couponCode) {
    !isEmpty(token) && setClientToken(token);

    return axios
      .post(`/coupon`, {
        restaurantSecretCode: restaurantId,
        couponName: couponCode,
      })
      .then(response => {
        !isEmpty(token) && removeClientToken(token);

        return response.data;
      });
  },
  getPromotionHeader: function (country, locationId) {
    return axios
      .post('/promotion/header', {
        locationId: locationId,
        lang: country,
      })
      .then(response => {
        return response.data;
      });
  },
  getDailyMenu: function (country, locationId) {
    return axios
      .post('/product/daily-menu', {
        locationId: locationId,
        lang: country,
      })
      .then(response => {
        return response.data;
      });
  },
  getUpSellProducts: function (restaurant_id, country) {
    return axios
      .post('/product/upsell', {
        restaurantId: restaurant_id,
        lang: country,
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return {};
      });
  },
};

export default FoodService;
