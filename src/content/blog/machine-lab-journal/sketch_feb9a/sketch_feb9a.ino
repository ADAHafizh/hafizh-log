// THIS IS THE CODE WITH SWITCH BUTTON TO CONTROL THE MOTOR DIRECTION 
// WE ACHIEVE THIS BY USING INPUT_PULLUP TO KEEP THE INTERNAL RESISTOR TO HIGH; PRESSING IT BRINGS IT TO LOW

int in1 = 8; 
int in2 = 9;
int ConA = 10; 
int potPin = A0;
int buttonPin = 2; // Added button pin 

bool isForward = true;   // Variable to keep track of the motor direction
bool lastButtonState = HIGH; // Variable to keep track of the button state

void setup() {
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  pinMode(ConA, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP); // Internal resistor 

  Serial.begin(9600);
}

void loop() {
  // 1. We first check the button state
  bool currentButtonState = digitalRead(buttonPin);

  // If button is pressed (LOW) and it wasn't pressed before, then
  if (currentButtonState == LOW && lastButtonState == HIGH) {
    isForward = !isForward; // Toggle the direction (true becomes false, etc)
    delay(50); // For ease-ness sake, we add a delay here so it doesn't jump. But improvements can be made using no delay() clocks for future codes.
  }
  lastButtonState = currentButtonState;

  // 2. Then, we set the direction of the motor 
  if (isForward) {
    digitalWrite(in1, HIGH);
    digitalWrite(in2, LOW);
  } else {
    digitalWrite(in1, LOW);
    digitalWrite(in2, HIGH);
  }

  // 3. Handling Speed
  int val = analogRead(potPin);
  int speed1 = map(val, 0, 1023, 0, 255);
  analogWrite(ConA, speed1);

  // 4. Debugging 
  Serial.print("Dir: ");
  Serial.print(isForward ? "FORW" : "BACK");
  Serial.print(" | Speed: ");
  Serial.print(map(speed1, 0, 255, 0, 100));
  Serial.println("%");

  delay(10); 
}