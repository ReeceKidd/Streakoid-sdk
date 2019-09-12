import { getServiceConfig } from "./getServiceConfig";

describe("getServiceConfig", () => {
    const environmentMock = {
        NODE_ENV: "NODE_ENV",
        APPLICATION_URL: "APPLICATION_URL",
    };

    test("that correct error is thrown when NODE_ENV is not provided", () => {
        expect.assertions(1);
        const environment = {
            ...environmentMock,
            NODE_ENV: undefined
        };

        try {
            getServiceConfig(environment);
        } catch (err) {
            expect(err.message).toEqual("NODE_ENV is not provided.");
        }
    });

    test("that correct error is thrown when APPLICATION_URL is not provided.", () => {
        expect.assertions(1);
        const environment = {
            ...environmentMock,
            APPLICATION_URL: undefined
        };

        try {
            getServiceConfig(environment);
        } catch (err) {
            expect(err.message).toEqual("APPLICATION_URL is not provided.");
        }
    });





});
