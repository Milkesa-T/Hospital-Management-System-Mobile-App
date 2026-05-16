import 'dart:convert';
import 'package:connectivity/connectivity.dart';
import 'package:http/http.dart' as http;

class Network {
  // Use localhost for web/desktop; 10.0.2.2 is for Android emulator.
  // Change to 10.0.2.2 if you run inside an Android emulator.
  final String url = "http://localhost:5000/api";

  static String? _token;

  // Set token after login
  static void setToken(String token) {
    _token = token;
  }

  Map<String, String> _getHeaders() {
    Map<String, String> headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    };
    if (_token != null) {
      headers['Authorization'] = 'Bearer $_token';
    }
    return headers;
  }

  postData(values, endpoint) async {
    var fullUrl = Uri.parse(url + endpoint);
    return await http.post(
      fullUrl,
      body: jsonEncode(values),
      headers: _getHeaders(),
    );
  }

  getData(endpoint) async {
    var fullUrl = Uri.parse(url + endpoint);
    return await http.get(
      fullUrl,
      headers: _getHeaders(),
    );
  }

  checkInternetConnection() async {
    var connectivityResult = await Connectivity().checkConnectivity();

    if (connectivityResult == ConnectivityResult.none) {
      return false;
    } else if (connectivityResult == ConnectivityResult.wifi ||
        connectivityResult == ConnectivityResult.mobile) {
      return true;
    }
  }
}
