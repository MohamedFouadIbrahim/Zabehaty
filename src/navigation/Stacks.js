import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
    Cart,
    DeliveryOptions,
    SelectDeliveryTime,
    Checkout,
    ApplyCoupon,
    SucessfulOrder,
    MyOrders,
    TrackingOrder,
    TrackingOrderMap,
    Addresses,
    Address,
    CountryCitySelectore,
    ForgetPassword,
    ResetPassword,
    PhoneNotFound,
    Registeration,
    RegisterationStep2,
    SocialRegisterationStep2,
    VerificationCode,
    OnBoardScreen,
    CountryAndCurrency,
    Zabayh,
    SingleZabeha,
    SingleShop,
    Home,
    ChooseLanguage,
    Login,
    MyAccount,
    Favorites,
    ContactUs,
    ReferFriends
} from "../screens";

const CartNavigator = createStackNavigator();
const AddressesNavigator = createStackNavigator();
const AuthNavigator = createStackNavigator();
const HomeNavigator = createStackNavigator();
const LanguageNavigator = createStackNavigator();
const MyAccountNavigator = createStackNavigator();
const FavouriteNavigator = createStackNavigator();
const ContactUsNavigator = createStackNavigator();
const ReferNavigator = createStackNavigator();


export const AddressesStack = () => (

    <AddressesNavigator.Navigator>

        <AddressesNavigator.Screen
            component={Addresses}
            name="Addresses"
            options={{ headerShown: false }}
        />

        <AddressesNavigator.Screen
            component={Address}
            name="Address"
            options={{ headerShown: false }}
        />


        <AddressesNavigator.Screen
            component={CountryCitySelectore}
            name="CountryCitySelectore"
            options={{ headerShown: false }}
        />

    </AddressesNavigator.Navigator>
)


export const CartStck = () => (
    <CartNavigator.Navigator>

        <CartNavigator.Screen
            component={Cart}
            name="Cart"
            options={{ headerShown: false }}
        />

        <CartNavigator.Screen
            component={DeliveryOptions}
            name="DeliveryOptions"
            options={{ headerShown: false }}
        />

        <CartNavigator.Screen
            component={SelectDeliveryTime}
            name="SelectDeliveryTime"
            options={{ headerShown: false }}
        />

        <CartNavigator.Screen
            component={Checkout}
            name="Checkout"
            options={{ headerShown: false }}
        />

        <CartNavigator.Screen
            component={ApplyCoupon}
            name="ApplyCoupon"
            options={{ headerShown: false }}
        />

        <CartNavigator.Screen
            component={SucessfulOrder}
            name="SucessfulOrder"
            options={{ headerShown: false }}
        />

        <CartNavigator.Screen
            component={MyOrders}
            name="MyOrders"
            options={{ headerShown: false }}
        />

        <CartNavigator.Screen
            component={TrackingOrder}
            name="TrackingOrder"
            options={{ headerShown: false }}
        />

        <CartNavigator.Screen
            component={TrackingOrderMap}
            name="TrackingOrderMap"
            options={{ headerShown: false }}
        />

        <CartNavigator.Screen
            component={AddressesStack}
            name="Addresses"
            options={{ headerShown: false }}
        />

    </CartNavigator.Navigator>
)

export const LanguageStack = () => (
    <LanguageNavigator.Navigator>

        <LanguageNavigator.Screen
            name="ChooseLanguage"
            component={ChooseLanguage}
            options={{ headerShown: false }}
        />
        <LanguageNavigator.Screen
            name="CountryAndCurrency"
            component={CountryAndCurrency}
            options={{ headerShown: false }}
        />

    </LanguageNavigator.Navigator>
)

export const FavoriteStack = () => (
    <FavouriteNavigator.Navigator>

        <FavouriteNavigator.Screen
            name="Favorites"
            component={Favorites}
            options={{ headerShown: false }}
        />
    </FavouriteNavigator.Navigator>
)

export const ReferStack = () => (
    <ReferNavigator.Navigator>

        <ReferNavigator.Screen
            name="ReferFriends"
            component={ReferFriends}
            options={{ headerShown: false }}
        />
    </ReferNavigator.Navigator>
)


export const ContactUsStack = () => (
    <ContactUsNavigator.Navigator>

        <FavouriteNavigator.Screen
            name="ContactUs"
            component={ContactUs}
            options={{ headerShown: false }}
        />
    </ContactUsNavigator.Navigator>
)


export const AuthStack = () => (

    <AuthNavigator.Navigator>

        <AuthNavigator.Screen
            name="OnBoardScreen"
            component={OnBoardScreen}
            options={{ headerShown: false }}
        />
        <AuthNavigator.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
        />
        <AuthNavigator.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={{ headerShown: false }}
        />
        <AuthNavigator.Screen
            name="VerificationCode"
            component={VerificationCode}
            options={{ headerShown: false }}
        />
        <AuthNavigator.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{ headerShown: false }}
        />
        <AuthNavigator.Screen
            name="Registeration"
            component={Registeration}
            options={{ headerShown: false }}
        />
        <AuthNavigator.Screen
            name="RegisterationStep2"
            component={RegisterationStep2}
            options={{ headerShown: false }}
        />
        <AuthNavigator.Screen
            name="SocialRegisterationStep2"
            component={SocialRegisterationStep2}
            options={{ headerShown: false }}
        />
        <AuthNavigator.Screen
            name="PhoneNotFound"
            component={PhoneNotFound}
            options={{ headerShown: false }}
        />
    </AuthNavigator.Navigator>

)

export const HomeStck = () => (
    <HomeNavigator.Navigator>

        <HomeNavigator.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
        />
        <HomeNavigator.Screen
            name="Zabayh"
            component={Zabayh}
            options={{ headerShown: false }}
        />
        <HomeNavigator.Screen
            name="SingleZabeha"
            component={SingleZabeha}
            options={{ headerShown: false }}
        />
        <HomeNavigator.Screen
            name="SingleShop"
            component={SingleShop}
            options={{ headerShown: false }}
        />
    </HomeNavigator.Navigator>
)

export const MyAccountStck = () => (
    <MyAccountNavigator.Navigator>

        <MyAccountNavigator.Screen
            name="MyAccount"
            component={MyAccount}
            options={{ headerShown: false }}
        />

        <MyAccountNavigator.Screen
            name="Addresses"
            component={AddressesStack}
            options={{ headerShown: false }}
        />

    </MyAccountNavigator.Navigator>
)