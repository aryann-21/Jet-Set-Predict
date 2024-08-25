import pandas as pd
import pickle
from sklearn.preprocessing import StandardScaler
from sklearn import preprocessing
from sklearn.linear_model import Lasso

# Load and preprocess data
df = pd.read_csv('flight_dataset.csv')
df['Combined_Date'] = df.apply(lambda row: f"{row['Date']:02d}-{row['Month']:02d}-{row['Year']}", axis=1)
df['Day'] = pd.to_datetime(df['Combined_Date'], format='%d-%m-%Y').dt.day_name()

# Label Encoding
label_encoder = preprocessing.LabelEncoder()
label_encoder.fit(df["Source"])
df["Source"] = label_encoder.transform(df["Source"])
label_encoder.fit(df['Destination'])
df['Destination'] = label_encoder.transform(df['Destination'])
label_encoder.fit(df['Day'])
df['Day'] = label_encoder.transform(df['Day'])

# Define function to train and save the model
def train_and_save_model(df):
    features = ['Source', 'Destination', 'Total_Stops', 'Day', 'Month']  # Included 'Day'
    target = ['Price', 'Duration_hours', 'Duration_min']
    X = df[features]
    y = df[target]
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    model = Lasso(alpha=1.0)
    model.fit(X_scaled, y)
    with open('trained_model.pkl', 'wb') as file:
        pickle.dump(model, file)
    with open('scaler.pkl', 'wb') as file:
        pickle.dump(scaler, file)
    return model, scaler

# Train and save the model
model, scaler = train_and_save_model(df)

# Optionally, check predictions (useful for testing)
def apply_lasso_linear_regression(df, airline_name, model, scaler):
    features = ['Source', 'Destination', 'Total_Stops', 'Day', 'Month']
    target = ['Price', 'Duration_hours', 'Duration_min']
    X = df[features]
    y = df[target]
    X_scaled = scaler.transform(X)
    y_pred = model.predict(X_scaled)
    print("Airline : ", airline_name)
    print("Predicted Price : ", y_pred[0][0])
    print("Predicted Duration (hours) : ", y_pred[0][1])
    print("Predicted Duration (minutes) : ", y_pred[0][2])

# Apply the model to each airline
grouped_by_airline = df.groupby('Airline')
for airline, group in grouped_by_airline:
    apply_lasso_linear_regression(group, airline, model, scaler)
