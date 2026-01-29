#include <Servo.h> 

const  byte potMeterPin = A3;     // Potentiometer Port
const byte buttonPin = 2; // Button pin for easier changing 
const long interval = 0; // Interval for speed 
int potMeterValue=0;  // Potentiometer initial value 
byte  rotation=0; // Rotation for servo 

unsigned long previousMillis = 0;  // will store last time LED was updated

// Code taken from Sparkfun 
// Written & Modified by Ahmad Dahlan Hafizh
// 28 Jan 2026

///// HOW THE PROGRAM WORKS //////

/// By default, Servo library does not have a speed control. Which means to get a speed, we need to have the rotation of the servo divided by certain amount of time to reach it
/// In other words, we need a clock counter (blink without delay), and then apply that to the Sweeper class
/// We also need to map out the potentiometer values to the speed 

///// CLASS SERVO /////

class Sweeper
{
  Servo servo;              // the servo
  int pos;              // current servo position 
  int increment;        // increment to move for each interval
  int  updateInterval;      // interval between updates
  int rotation;
  unsigned long lastUpdate; // last update of position

public: 
  // We can delete the need for passing int values in Sweeper() because we are going to use update 
  Sweeper()
  {
    lastUpdate = 0; 
  }
  
  void Attach(int pin)
  {
    servo.attach(pin);
  }
  
  void Detach()
  {
    servo.detach();
  }
  
  // If we have update, then we also need to save the update information in the event that the button is not pressed, so that the counter doesn't reset. Let's add that. 
  void Update(int speed)
  {
    if((millis() - lastUpdate) > speed)  // time to update
    {
      lastUpdate = millis();
      pos += increment;

      servo.write(pos);
      Serial.println(pos);

      if ((pos >= 180)) // end of sweep
      {
        pos = 180; 
        increment = -1;
      }

      else if (pos <= 0)
      {
        pos = 0;
        increment = 1;
      }
    }
  }

  void Rotation(int rotation)
  {
    servo.write(rotation);
  }
};
 
Sweeper sweeper1;
 
void setup() 
{ 
  Serial.begin(9600);
  pinMode(buttonPin, INPUT_PULLUP); 
  pinMode(potMeterPin,INPUT);  //potentiometer is an input=>it sends information to the computer
  sweeper1.Attach(10);
} 
 
void loop() 
{ 

  // Read Potentiometer and map to a speed interval (e.g 5ms to 100ms)
  int potValue =  analogRead(potMeterPin);
  int speed = map(potValue, 0, 1023, 5, 100);

  // Check button state 
  if (digitalRead(buttonPin) == LOW)
  {
    sweeper1.Update(speed);
  }

  // Debugging 
  static unsigned long lastPrint = 0;
  if (millis() - lastPrint > 500) {
    Serial.print("Speed Interval: ");
    Serial.println(speed);
    lastPrint = millis();
  }
}