# Homepage (Root path)
require 'sinatra/json'

get '/' do
  erb :index
end

get '/api/contact/list' do
  @contacts = Contact.all
  json @contacts
end

get '/api/contact/:id' do
  @contact = Contact.find(params[:id])
  json @contact
end


post '/contact/new' do
  @contact = Contact.new(
    first_name: params[:first_name],
    last_name: params[:last_name],
    email: params[:email],
    phone: params[:phone])
  if @contact.save
    redirect '/api/contact/list'
  else
    erb :index
  end
end



post '/search' do
  redirect '/'
end