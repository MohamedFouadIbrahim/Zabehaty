import { createDrawerNavigator } from '@react-navigation/drawer';
import React from "react";
import DrawerContent, { DrawerItems } from "./DrawerContent";
import { useSelector } from 'react-redux';

const DrawerNavigator = createDrawerNavigator()

const MainApplication = () => {

    const userData = useSelector(state => state.session.user)

    return (
        <DrawerNavigator.Navigator drawerContent={(props) => <DrawerContent {...props} userData={userData} />} >
            {
                DrawerItems.map((oneDrawerItem, index) => (
                    <DrawerNavigator.Screen
                        key={String(index)}
                        name={oneDrawerItem.name}
                        component={oneDrawerItem.component}
                    />
                ))
            }
        </DrawerNavigator.Navigator>
    )
}
export default MainApplication
