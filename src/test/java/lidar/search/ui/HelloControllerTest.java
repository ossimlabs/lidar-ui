package lidar.search.ui;

import io.micronaut.http.client.RxHttpClient;
import io.micronaut.http.client.annotation.Client;
import io.micronaut.test.annotation.MicronautTest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import javax.inject.Inject;

@MicronautTest
public class HelloControllerTest {

        @Inject
        HelloClient helloClient;

        @Test
        void testHello() {
            Assertions.assertEquals(
                    "Hello john",
                    helloClient.hello("john").blockingGet().getText()
            );
        }



}
