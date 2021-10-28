import React from "react";
import { View } from "react-native";
import { appleAuth } from '@invertase/react-native-apple-authentication';

import { styles } from "./styles";
import { SignIn } from "..";
import { icons } from "../../assets";

const SocialLogin = ({ onFacebookLogin, onGoogleLogin, onAppleLogin }) => {
	return (
		<View style={styles.facebookAndGoogle}>
			{
				(appleAuth.isSupported &&
					<SignIn
						title="Google"
						socialImage={icons.googlePlus}
						style={styles.google}
						txtstyle={styles.googleText}
						imageStyle={styles.GoogleImageStyle}
						onPress={onGoogleLogin}
					/>
				)
			}
			<SignIn
				title="Facebook"
				socialImage={icons.facebook}
				style={styles.facebook}
				imageStyle={styles.facbookImageStyle}
				onPress={onFacebookLogin}
			/>
			{
				(appleAuth.isSupported &&
					<SignIn
						title="Apple"
						socialImage={icons.apple}
						style={styles.apple}
						imageStyle={styles.AppleImageStyle}
						onPress={onAppleLogin}
					/>
				)
			}
		</View>
	);
};

export { SocialLogin };
