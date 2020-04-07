package lidar.search.ui;

import io.micronaut.http.annotation.Get;
import io.micronaut.http.client.annotation.Client;
import io.micronaut.retry.annotation.Retryable;
import io.reactivex.Single;

import javax.sql.rowset.serial.SerialStruct;

@Client("/hello")
public interface HelloClient extends HelloOperations {
    @Override
    @Retryable(attempts = "$hello.world.client.retry-attempts:5}")
    Single<Greeting> hello(String name);
}
