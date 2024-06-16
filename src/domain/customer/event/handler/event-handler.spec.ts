import EventDispatcher from "../../../@shared/event/event-dispatcher";
import CustomerAddressChangedEvent from "../customer-address-changed.event";
import CustomerCreatedEvent from "../customer-created.event";
import ShowMessageWhenCustomerAddressIsChangedHandler from "./show-message-when-customer-address-is-changed.handler";
import ShowMessage1WhenCustomerIsCreatedHandler from "./show-message1-when-customer-is-created.handler";
import ShowMessage2WhenCustomerIsCreatedHandler from "./show-message2-when-customer-is-created.handler";

describe("Customer events tests", () => {
  it("should register show message 1 when customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new ShowMessage1WhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister show message 1 when customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new ShowMessage1WhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(0);
  });

  it("should register show message 2 when customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new ShowMessage2WhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister show message 2 when customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new ShowMessage2WhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(0);
  });

  it("should register show message when customer address is changed", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new ShowMessage1WhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister show message when customer address is changed", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new ShowMessage1WhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("CustomerAddressChangedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length
    ).toBe(0);
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new ShowMessage1WhenCustomerIsCreatedHandler();
    const eventHandler1Spy = jest.spyOn(eventHandler1, "handle");
    const eventHandler2 = new ShowMessage2WhenCustomerIsCreatedHandler();
    const eventHandler2Spy = jest.spyOn(eventHandler2, "handle");
    const eventHandler3 = new ShowMessageWhenCustomerAddressIsChangedHandler();
    const eventHandler3Spy = jest.spyOn(eventHandler3, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler3);

    const event1 = new CustomerCreatedEvent({
      id: "123",
      name: "Jhon",
      address: "Rua dos Bobos, 0",
    });

    eventDispatcher.notify(event1);

    expect(eventHandler1Spy).toHaveBeenCalled();
    expect(eventHandler2Spy).toHaveBeenCalled();
    expect(eventHandler3Spy).not.toHaveBeenCalled();

    const event2 = new CustomerAddressChangedEvent({
      id: "123",
      name: "Jhon",
      address: "Rua dos Bobos, 0",
    });

    eventDispatcher.notify(event2);

    expect(eventHandler1Spy).toHaveBeenCalledTimes(1);
    expect(eventHandler2Spy).toHaveBeenCalledTimes(1);
    expect(eventHandler3Spy).toHaveBeenCalled();
  });
});
