# Device Manufacturing System (Abstract Factory Pattern)

This project demonstrates the Abstract Factory Design Pattern.

## Problem Overview
Multiple brands (Apple, Samsung) manufacture multiple devices (Laptop, Phone).
The Abstract Factory Pattern is used to create families of related objects
without specifying their concrete classes.

## Design Pattern Used
Abstract Factory Pattern

## Components
- Abstract Factory: DeviceFactory
- Concrete Factories: AppleFactory, SamsungFactory
- Abstract Product: Device
- Concrete Products:
  - AppleLaptop
  - ApplePhone
  - SamsungLaptop
  - SamsungPhone

## Advantages
- Brand consistency
- Loose coupling
- Easy scalability
- Clean separation of concerns

## Output
Creates:
- Apple Laptop
- Samsung Phone

And prints their specifications.