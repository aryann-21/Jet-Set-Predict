from flask import Flask, jsonify, request
import pandas as pd
import pickle
from sklearn.preprocessing import StandardScaler
from sklearn import preprocessing

app = Flask(__name__)

# Load trained model and scaler
with open('trained_model.pkl', 'rb') as file:
    model = pickle.load(file)
with open('scaler.pkl', 'rb') as file:
    scaler = pickle.load(file)

# Load flights dataset for preprocessing (if needed)
flights_data = pd.read_csv('flight_dataset.csv')

# Preprocess flights_data (if needed)
# Example preprocessing steps
label_encoder = preprocessing.LabelEncoder()
label_encoder.fit(flights_data["Source"])
flights_data["Source"] = label_encoder.transform(flights_data["Source"])
label_encoder.fit(flights_data['Destination'])
flights_data['Destination'] = label_encoder.transform(flights_data['Destination'])
label_encoder.fit(flights_data['Day'])
flights_data['Day'] = label_encoder.transform(flights_data['Day'])

# Define Flask route for predicting flights
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # Example: Perform prediction using the model
    features = ['Source', 'Destination', 'Total_Stops', 'Day', 'Month']
    X = pd.DataFrame(data, index=[0])[features]
    X_scaled = scaler.transform(X)
    prediction = model.predict(X_scaled)

    # Prepare response
    response = {
        'predicted_price': prediction[0][0],
        'predicted_duration_hours': prediction[0][1],
        'predicted_duration_minutes': prediction[0][2]
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
