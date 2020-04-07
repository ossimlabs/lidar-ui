package lidar.search.ui;

import io.micronaut.http.annotation.Get;
import io.reactivex.Single;

public interface HelloOperations {

    @Get("/{name}")
    Single<Greeting> hello(String name);
}
