# QuickChat

This project is a WebRTC-based application that facilitates quick video calls using the Cloudflare Calls API. It includes features such as phone number sign-up with OTP verification via Twilio, chat functionality, screen sharing, reactions during calls, and integration with Google Calendar for scheduling video calls.

## Features

- **Quick Call Module**: Users can initiate quick calls using a unique ID and PIN code.
- **Chat Functionality**: Real-time chat during calls to enhance communication.
- **Screen Sharing**: Users can share their screens during calls for better collaboration.
- **Reactions**: Users can send reactions during calls to express themselves.
- **Phone Number Sign-Up**: Users can sign up using their phone numbers, with OTP verification handled by Twilio.
- **Google Calendar Integration**: Users can plan and schedule video calls directly through Google Calendar.

## Technologies Used

- **React**: For building the user interface.
- **TailwindCSS**: For styling the application.
- **Cloudflare Calls API**: For managing video calls.
- **Twilio**: For handling OTP verification and user sign-up.
- **Google Calendar API**: For scheduling video calls.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd webrtc-calls-app
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add your API keys for Twilio and Google Calendar.

4. **Run the application**:
   ```
   npm start
   ```

5. **Open your browser**:
   Navigate to `http://localhost:3000` to view the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.