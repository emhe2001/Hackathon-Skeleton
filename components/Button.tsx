import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'glass';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  icon
}: ButtonProps) {
  const getGradientColors = () => {
    if (disabled) return ['#555555', '#333333'] as const;
    
    switch (variant) {
      case 'primary':
        return Colors.gradientPurple;
      case 'secondary':
        return Colors.gradientPink;
      case 'danger':
        return ['#FF3B30', '#FF0000'] as const;
      default:
        return Colors.gradientPurple;
    }
  };
  
  const getTextColor = () => {
    if (disabled) return '#999999';
    
    switch (variant) {
      case 'outline':
      case 'glass':
        return Colors.primary;
      default:
        return '#FFFFFF';
    }
  };
  
  const getBorderColor = () => {
    if (disabled) return Colors.inactive;
    
    switch (variant) {
      case 'outline':
        return Colors.primary;
      case 'glass':
        return 'rgba(255, 255, 255, 0.2)';
      default:
        return 'transparent';
    }
  };
  
  const getButtonSize = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: 8,
          paddingHorizontal: 16,
        };
      case 'large':
        return {
          paddingVertical: 16,
          paddingHorizontal: 24,
        };
      default:
        return {
          paddingVertical: 12,
          paddingHorizontal: 20,
        };
    }
  };
  
  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 14;
      case 'large':
        return 18;
      default:
        return 16;
    }
  };

  const renderButtonContent = () => (
    <>
      {loading ? (
        <ActivityIndicator color="#FFFFFF" size="small" />
      ) : (
        <>
          {icon && icon}
          <Text
            style={[
              styles.text,
              { fontSize: getTextSize() },
              { color: getTextColor() },
              icon && styles.textWithIcon,
              textStyle
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </>
  );

  if (variant === 'outline' || variant === 'glass') {
    return (
      <TouchableOpacity
        style={[
          styles.button,
          getButtonSize(),
          { 
            backgroundColor: variant === 'glass' ? 'rgba(30, 30, 30, 0.6)' : 'transparent',
            borderColor: getBorderColor(),
          },
          fullWidth && styles.fullWidth,
          style
        ]}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
      >
        {renderButtonContent()}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonSize(),
        fullWidth && styles.fullWidth,
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {renderButtonContent()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  textWithIcon: {
    marginLeft: 8,
  },
});