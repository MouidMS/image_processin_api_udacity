"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable */
const jasmine_spec_reporter_1 = require("jasmine-spec-reporter");
class CustomProcessor extends jasmine_spec_reporter_1.DisplayProcessor {
    displayJasmineStarted(info, log) {
        return `${log}`;
    }
}
jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new jasmine_spec_reporter_1.SpecReporter({
    suite: {
        displayNumber: true
    },
    spec: {
        displayStacktrace: jasmine_spec_reporter_1.StacktraceOption.NONE
    },
    customProcessors: [CustomProcessor]
}));
