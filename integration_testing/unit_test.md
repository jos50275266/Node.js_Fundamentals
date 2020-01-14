# What to Unit Test

애초에 대부분의 routes and middleware는 http req, res, next 등과 연관이 있기 때문에
너무도 많은 Mock Function을 생성해야함으로 이 경우 대부분 integration test를 진행한다.
굳이 하자면, models의 user model의 userSchema.methods.generateAuthToken 함수를 
unit-test 해볼 수 있다. 즉, unit-test는 단일 동작의 함수를 테스트 하기에 적합하다.