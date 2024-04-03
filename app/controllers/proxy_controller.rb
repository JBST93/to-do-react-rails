class ProxyController < ApplicationController
  require 'net/http'
  require 'uri'

  def top_exchanges
    fsym = params[:fsym]
    tsym = params[:tsym]
    url = URI.parse("https://min-api.cryptocompare.com/data/top/exchanges?fsym=#{fsym}&tsym=#{tsym}")
    response = Net::HTTP.get_response(url)
    render json: response.body
  end
end
