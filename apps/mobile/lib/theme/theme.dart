import 'package:flutter/material.dart';

const _brand = Color(0xFF0EA5E9);

ThemeData buildLightTheme() {
  return ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(seedColor: _brand, brightness: Brightness.light),
    fontFamily: 'Inter',
  );
}

ThemeData buildDarkTheme() {
  return ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(seedColor: _brand, brightness: Brightness.dark),
    fontFamily: 'Inter',
  );
}
