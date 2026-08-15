---
exported: 2026-08-15T20:32:12.723Z
source: NotebookLM
type: report
title: "The PRIZM/TETRIX Robotics Encyclopedia: A Guide for Claude CoWork"
---

# The PRIZM/TETRIX Robotics Encyclopedia: A Guide for Claude CoWork

导出时间: 8/15/2026, 4:32:12 PM

---

# PRIZM/TETRIX Robotics Encyclopedia: Technical Reference for Claude CoWork

## 1\. Foundations of the TETRIX PRIZM Ecosystem

The PRIZM controller functions as a strategic bridge between introductory educational robotics and professional-grade embedded engineering. By utilizing an Arduino-compatible architecture, it enables developers to transition from basic logic to sophisticated, real-time control systems using industry-standard syntax. This ecosystem was specifically designed to provide a deterministic environment where the hardware responds with the reliability required for competitive and industrial prototyping.

### Core Architecture: The AVR-to-ESP32 Bridge

The evolution of the PRIZM hardware represents a significant shift in processing power and methodology:

-   **Legacy PRIZM (ATmega328P):** Built on the 8-bit AVR architecture with the Optiboot bootloader, this system mirrors the Arduino Uno. It provides a highly stable, single-threaded environment ideal for real-time motor control and deterministic sensor polling.
-   **PRIZM Pro (ESP32S3):** This modern iteration introduces a dual-core 32-bit architecture. The move to the ESP32S3 allows for multi-core processing, significantly higher clock speeds, and the integration of IoT and AI capabilities that the original AVR chip could not support.

### Strategic Support and Legacy Status

As of 2024, the standard PRIZM controller has transitioned to **Legacy Status**. For the Claude CoWork support strategy, this necessitates a focus on "preservation engineering." Technical workflows must recognize that `TETRIX_PRIZM.zip` and `TETRIX_PRIZM_PRO.zip` are distinct, mutually exclusive libraries. While the original PRIZM remains a robust tool for classroom environments, developers must account for the lack of future feature updates, prioritizing the maintenance of existing firmware protocols and community-driven documentation. This architectural foundation sets the stage for the precise hardware-to-software alignment required for robotic stability.

* * *

## 2\. Hardware Topography and Connectivity Standards

In high-stakes robotics, hardware-software alignment is the primary defense against system instability. A Senior Architect must ensure that port assignments are not merely "functional" but optimized for electronic protection and signal integrity. Mismatched protocols at the physical layer often result in race conditions or catastrophic hardware failure.

### Controller Port Mapping and Specifications

The following table defines the official port topography for the PRIZM ecosystem:

| Port Group | Connector Type | Intended Components | Logic/Technical Note |
| --- | --- | --- | --- |
| DC Motor 1-2 | Powerpole | TorqueNADO Motors | Supports high-torque 12V DC output |
| Servo 1-6 | 3-Pin Header | Std/Continuous Servos | PWM-controlled angular or rotational motion |
| Encoder 1-2 | 4-Pin Keyed | Motor Encoders | Quadrature tracking; distinct from sensor ports |
| Sensor 1-6 | 3-Pin Keyed | Ultrasonic/Line Finder | Specialized I/O for environmental feedback |
| I2C Expansion | 4-Pin Data | Tele-Op/Expansion | Daisy-chain bus for peripheral scalability |

### Wiring Protocols and Critical Safety

Adherence to standardized wiring prevents electrical shorts and signal noise:

-   **The Powerpole Rule:** A strict "red-to-red/black-to-black" orientation is mandatory for all motor and battery connections.
-   **Servo Orientation:** The black (ground) wire must always be oriented toward the notched side of the port (closest to the DC motor terminals).
-   **Keyed Integrity:** Encoder ports utilize a 4-pin keyed connector to prevent cross-wiring with the 3-pin sensor ports, a critical distinction for preserving logic-level signals.

### ⚠ Strategic Safety Warning: Power Management

The PRIZM system is engineered exclusively for the **TETRIX 12-Volt Rechargeable NiMH Battery Pack**. The use of any third-party power source is strictly prohibited; doing so introduces voltage fluctuations that can damage the ATmega328P and **will void the equipment warranty**. Furthermore, never attempt to parallel-link two battery packs to a single controller.

* * *

## 3\. Development Environment and Software Configuration

The strategic advantage of the PRIZM ecosystem is its integration into the Arduino IDE, allowing for rapid prototyping through established C++ abstraction layers.

### Library and Board Configuration

Successful deployment requires precise environment variables:

1.  **Library Isolation:** Ensure the correct library is active. `TETRIX_PRIZM.zip` for legacy boards and `TETRIX_PRIZM_PRO.zip` for Pro modules cannot coexist in the same project header without conflicts.
2.  **Board Selection:**
    -   **Standard PRIZM:** Select **Tools > Board > Arduino/Genuino Uno**.
    -   **PRIZM Pro:** Requires the `esp32` core by Espressif; select **ESP32S3 Dev Module**.
3.  **Communication:** Identify the correct COM port via **Tools > Port**. For Tele-Op users, the USB cable must remain in the PRIZM programming port; connecting to the Tele-Op module's firmware port during a sketch upload will overwrite its firmware and render the module unusable.

* * *

## 4\. Core PRIZM Arduino Library API Reference

A standardized API is essential for repeatable robotic behavior. The `PRIZM.h` library provides the high-level logic required to translate code into physical force.

### Essential API Functions

| Function Syntax | Parameters | Systemic Logic Impact |
| --- | --- | --- |
| prizm.PrizmBegin() | None | Stabilizes the I2C bus and resets internal registers to prevent startup race conditions. |
| prizm.setMotorPowers(m1, m2) | -100 to 100 | Commands bridge-rectified DC output; balances power across both drive channels. |
| prizm.setServoPosition(s#, pos) | 1-6, 0-180 | Sends a timed PWM pulse to maintain a specific angular hold. |
| prizm.readSonicSensorCM(port) | 1-6 | Triggers a 40kHz pulse and calculates distance based on return-echo timing. |
| prizm.readLineSensor(port) | 1-6 | Returns a digital boolean (0/1) for IR reflectance thresholds. |

### Precision Movement and Encoder Hardcoding

For precision navigation, the PRIZM utilizes a hardcoded 1:1 relationship between drive channels and feedback channels. **DC Motor Port 1** is electronically paired with **Encoder Port 1**, and **Motor Port 2** with **Encoder Port 2**. This relationship is vital for speed-regulated commands, allowing the controller to compensate for mechanical resistance and wheel slippage automatically.

* * *

## 5\. Tele-Op Module and PS4 Bluetooth Integration

Tele-operation shifts the system from autonomous logic to human-in-the-loop control. This is facilitated through the Tele-Op module and a DUALSHOCK 4 (PS4) controller.

### Bluetooth Pairing and Calibration

-   **Discovery Mode:** With the Bluetooth dongle inserted, hold **Share + Power** on the PS4 controller for 5 seconds (rapid white flash). Press the **Black Button** on the Tele-Op module to finalize the pair (solid green LED).
-   **DeadZone Calibration:** Use `ps4.setDeadZone` to define the neutral area for joysticks. This is strategically vital to compensate for mechanical potentiometer wear and prevent "phantom" motor movement (drifting).

### Drive Modes and Speed Scaling

The system uses a `powerMultiplier` logic to manage three distinct performance tiers:

-   **Crawl Mode (L1):** 15% power (`lowSpeed`). Used for high-precision maneuvering. (Controller LED: **RED**)
-   **Normal Mode (Default):** 35% power (`medSpeed`). The standard operating profile for balanced control. (Controller LED: **YELLOW**)
-   **Turbo Mode (R1):** 100% power (`highSpeed`). Maximum output for high-speed traversal. (Controller LED: **GREEN**)

### Advanced Mapping: Button Groups and Gyroscope Logic

The API categorizes inputs into two groups, returning unique byte values for complex logic:

**Button Group 2 (Direction Pad) Byte Values:**

-   **1:** Forward | **2:** Backward | **4:** Rotate Right | **8:** Rotate Left
-   **9:** Pivot Forward Left | **10:** Pivot Backward Right | **6:** Pivot Backward Left | **5:** Pivot Forward Right

**Special Logic Modes:**

-   **Pitch and Roll (L1 + R1 / Value 10):** Uses the internal gyroscope. The motor logic is calculated as:
    -   **Motor 1 Power:** Pitch + Roll
    -   **Motor 2 Power:** Pitch - Roll
-   **Line Following (L2 + R2 / Value 5):** Triggers an autonomous override for sensor-based navigation.
-   **Proximity Feedback:** If `readSonicSensorCM` detects an object within **50cm**, the controller triggers the internal rumble motors as a haptic warning.

* * *

## 6\. The "Easy Movement" Community Wrapper (tetrixPrizm)

Pedagogical abstraction layers like the `movement.h` wrapper are essential for reducing the barrier to entry. While **not an official Pitsco library**, this community-driven tool is highly recommended for introductory curriculum.

### Abstraction Commands

-   `forward(feet)` / `reverse(feet)`: Converts distance into encoder counts.
-   `left(degrees)` / `right(degrees)`: Executes point turns based on hardcoded wheel-base geometry.

### Implementation Example: Wall Avoidance

```
#include <PRIZM.h>
#include <movement.h>

void loop() {
  float dist = prizm.readSonicSensorCM(3);
  if (dist <= 40) {         
    reverse(2);          // Wrapper abstracts motor power math
    left(90);            // Wrapper abstracts encoder degree calculation
  }
  forward(1);            
}
```

* * *

## 7\. I2C Expansion and Multi-Controller Logic

The PRIZM architecture is designed for extreme scalability through I2C daisy-chaining. This allows a single master controller to manage complex mechanical systems, such as multi-jointed arms or advanced gimbals.

### Scaling the Architecture

-   **Daisy-Chaining:** Connect the I2C output of the PRIZM to the input of an expansion module (DC or Servo). The system supports a **maximum of four expansion units** total, which can be any combination of DC and Servo controllers.
-   **Addressing:** Each module in the chain must have a unique I2C address, ensuring that the PRIZM master can target specific peripherals using commands like `setMotorPower(address, motor#, power)`.
-   **Firmware Verification:** Use `readDCFirmware` to ensure peripheral compatibility before executing complex motion profiles across the daisy-chain.

Through this combination of a deterministic core, modular expansion, and high-level software wrappers, the TETRIX PRIZM ecosystem provides a robust framework for evolving robotic systems.