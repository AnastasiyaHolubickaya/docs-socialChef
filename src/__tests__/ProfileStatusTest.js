import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "../components/profile/ProfileInfo/ProfileStatus";
import ProfileStatusHook from "../components/profile/ProfileInfo/ProfileStatusHook";

describe("ProfileStatus component", () => {
    test("status in state", () => {
        const component = create(<ProfileStatus status="SUBSCRIBE TO BASIC" />);
        const instance = component.getInstance();//component.getInstance() - экземпляр объекта, который создал реакт на базе нашей классовой компоненты (обращаемся к нему)
        expect(instance.state.status).toBe("SUBSCRIBE TO BASIC");// проверяем что должно быть в статусе
    });

    test("span", () => {
        const component = create(<ProfileStatus status="SUBSCRIBE TO BASIC" />);
        const instance = component.root;//component.getInstance() - экземпляр объекта, который создал реакт на базе нашей классовой компоненты (обращаемся к нему)
        let span = instance.findAllByType('span');
        expect(span).not.toBeNull();
    });

    test("input not found", () => {
        const component = create(<ProfileStatus status="SUBSCRIBE TO BASIC" />);
        const instance = component.root;//component.getInstance() - экземпляр объекта, который создал реакт на базе нашей классовой компоненты (обращаемся к нему)
       expect( () => {
           let input = instance.findByType('input');
       }).toThrow();
    });
    /*
        test("span children 0 'SUBSCRIBE TO BASIC'", () => {
                const component = create(<ProfileStatus  />);
                const instance = component.root;//component.getInstance() - экземпляр объекта, который создал реакт на базе нашей классовой компоненты (обращаемся к нему)
                const span = instance.findByType('span');
                expect(span.props.children[0]).toBe('SUBSCRIBE TO BASIC');// проверяем что должно бытв статусе
        });
    /*
        test("input instead span", () => {
            const component = create(<ProfileStatus status="SUBSCRIBE TO BASIC" />);
            const instance = component.root;//component.getInstance() - экземпляр объекта, который создал реакт на базе нашей классовой компоненты (обращаемся к нему)
            let span = instance.findByType("span");
            span.props.onDoubleClick();
            let input = instance.findByType('input');
            expect(input.props.value).toBe('SUBSCRIBE TO BASIC');// проверяем что должно быть в статусе
        });*/

    test("input instead span", () => {
        const Callback = jest.fn();
        const component = create(<ProfileStatus status="SUBSCRIBE TO BASIC" updateStatus = {Callback} />);
        const instance = component.getInstance();//component.getInstance() - экземпляр объекта, который создал реакт на базе нашей классовой компоненты (обращаемся к нему)
        instance.deActivateEditMode();
        expect(Callback.mock.calls.length).toBe(1);// проверяем что должно быть в статусе
    });

});