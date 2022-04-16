FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["HouseholdManager/HouseholdManager.csproj", "HouseholdManager/"]
RUN dotnet restore "HouseholdManager/HouseholdManager.csproj"
COPY . .
WORKDIR "/src/HouseholdManager"
RUN dotnet build "HouseholdManager.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "HouseholdManager.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "HouseholdManager.dll"]
