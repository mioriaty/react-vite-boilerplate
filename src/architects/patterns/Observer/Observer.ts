/**
  Observer pattern là một mẫu thiết kế phần mềm trong đó một đối tượng (subject) giữ danh sách các đối tượng quan sát (observers) và thông báo cho tất cả các observers khi có bất kỳ sự thay đổi nào trên đối tượng đó. Mẫu thiết kế này giúp giảm sự phụ thuộc giữa các đối tượng, tăng tính linh hoạt và dễ dàng mở rộng.
* */

interface Subject {
  register(observer: Observer): void;
  remove(observer: Observer): void;
  notify(): void;
}

interface Observer {
  update(data: any): void;
}

// Demo
export class WeatherData implements Subject {
  private observers: Observer[] = [];
  private temperature = 0;

  register(observer: Observer): void {
    this.observers.push(observer);
  }

  remove(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(): void {
    for (const observer of this.observers) {
      observer.update(this.temperature);
    }
  }

  setTemperature(temperature: number) {
    this.temperature = temperature;
    this.notify();
  }
}

class TemperatureDisplay implements Observer {
  private subject: Subject;

  constructor(subject: Subject) {
    this.subject = subject;
    this.subject.register(this);
  }

  update(temperature: number): void {
    console.log(`The temperature is ${temperature} degrees Celsius`);
  }
}

const weatherData = new WeatherData();
const _temperatureDisplay = new TemperatureDisplay(weatherData);

weatherData.setTemperature(25);
