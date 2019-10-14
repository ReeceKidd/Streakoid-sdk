import axios from 'axios';
import { getServiceConfig } from '../src/getServiceConfig';
import { SupportedRequestHeaders, streakoidFactory } from '../src';
import { londonTimezone } from '../src/streakoid';

const { APPLICATION_URL } = getServiceConfig();

const streakoidTestClient = axios.create({
    headers: {
        'Content-Type': 'application/json',
        [SupportedRequestHeaders.xTimezone]: londonTimezone,
        [SupportedRequestHeaders.Authorization]:
            'eyJraWQiOiJkc3lrWWlWd25lakFtKzVac1wvY0JWQ3F0b3BzRng5WEpta1hkcUp4TXhyTT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjYzdiZDAzOS01NjMxLTRhZmUtODJkOC00ODAzMzUzOTE3YmQiLCJhdWQiOiI2OGFncDhiY205YmlkaGg0cDk3cmoxa2UxZyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6IjAwYTk4NjRjLTAyYTMtNDUwZS04ZDBkLTcwNGVmNzEzYTJmYyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTcwOTcxMzkwLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9qek5HMnNrZTkiLCJjb2duaXRvOnVzZXJuYW1lIjoicmVlY2UiLCJleHAiOjE1NzEwNDY3NDAsImlhdCI6MTU3MTA0MzE0MCwiZW1haWwiOiJyZWVjZWtpZGQ5NUBnbWFpbC5jb20ifQ.Qq5FO7d7BFlODp6uWBpHJ96ovgrtsV5fg_jYYucB2s7DTV8ncrPujINJLCfrqzil67NVv9PatWoPUQZzRlSJBBWcYzqjN3C0z0aS4S5wa5AE_nbNf5nrywo9OnbjSFJxHB3B8XapHBbQ_nutuU9d4Tff0523e8aF27u5Qjk9yHaBoIK4YedmJU_qVTDgKipueZiZhPFP-hppBtd84ddcrTYF71goDhagBQQMTLTrOn46hkRrQBrWOmoKhQmjVlpJ3xafVo44O9t1HllaMH2jHIKcG6-QBwyVLh_v23rPRmqk8Q2fEBB-oX6fQh8v19Obvn3DbmgFYAD1zds8vX1z0w',
    },
    baseURL: APPLICATION_URL,
});

const streakoidTest = streakoidFactory(streakoidTestClient);

export { streakoidTest };
