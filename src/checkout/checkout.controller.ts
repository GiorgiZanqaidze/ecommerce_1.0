import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags, ApiBody, ApiResponse } from "@nestjs/swagger";
import { CheckoutService } from "./checkout.service";
import { CheckoutMessageDto } from "./dto/checkout-message.dto";

@ApiTags("checkout") // Tag for categorizing this controller in Swagger UI
@Controller("checkout")
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  @ApiBody({ type: CheckoutMessageDto }) // Document the request body type
  @ApiResponse({ status: 201, description: "Checkout process initiated." }) // Document successful response
  @ApiResponse({ status: 400, description: "Bad Request: One or more items are out of stock." }) // Document error response
  async checkout(@Body() cart: CheckoutMessageDto): Promise<{ message: string }> {
    return this.checkoutService.checkout(cart);
  }
}
