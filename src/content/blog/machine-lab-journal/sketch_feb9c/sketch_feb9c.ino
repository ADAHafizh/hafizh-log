// THIS IS FOR POTENTIOMETER CONTROLLING THE SPEED

int in1 = 8; // H-bridge inputs
int in2 = 9;
int ConA = 10; // Controller A (ENA)
int potPin = A0; // Potentiometer Analog Input
int speed1; // Variable for Motor Speed
  
void setup() {
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  pinMode(ConA, OUTPUT);

  Serial.begin(9600);

  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
}

void loop() {
  int val = analogRead(potPin);
  // We map the values of potentiometer to PWM range 
  speed1 = map(val, 0, 1023, 0, 255);

  // Then we feed it into the motor
  analogWrite(ConA, speed1);

  // To make things easier, I mapped the speed into percentages so I can read it easier to debug it as well
  int percentage = map(speed1, 0, 255, 0, 100);

  // Printing the values
  Serial.print("Potentiometer: ");
  Serial.print(val);
  Serial.print(" | PWM Signal: ");
  Serial.print(speed1);
  Serial.print(" | Motor Speed: ");
  Serial.print(percentage);
  Serial.println("%");

  delay(100);  // Small delay so the text doesn't fly by too fast to read
}