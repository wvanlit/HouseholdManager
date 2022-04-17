using Microsoft.EntityFrameworkCore;

namespace HouseholdManager.Services;

public class HouseholdService
{
    private readonly HouseholdRepository _householdRepository;
    private readonly UserRepository _userRepository;

    public HouseholdService(HouseholdRepository householdRepository, UserRepository userRepository)
    {
        _householdRepository = householdRepository;
        _userRepository = userRepository;
    }

    public async Task<HouseholdDto?> FindHousehold(int householdId)
    {
        var household = await _householdRepository.Find(householdId);
        if (household is null) return null;
        return ToHouseholdDto(household);
    }
    
    public async Task<List<HouseholdDto>> FindUserHouseholds(string username)
    {
        var households = await _householdRepository.Where(h => h.Users.Any(user => user.Username == username)).ToListAsync();
        return households.ConvertAll(ToHouseholdDto);
    }

    public async Task<HouseholdDto> CreateNewHousehold(HouseholdDto dto)
    {
        var users = _userRepository.Where(user => dto.Usernames.Contains(user.Username));

        var household = new Household()
        {
            Name = dto.Name,
            Users = users.ToList()
        };

        await _householdRepository.Create(household);
        return dto;
    }

    public async Task<HouseholdDto> UpdateHousehold(HouseholdDto dto)
    {
        var household = FromHouseholdDto(dto);
        await _householdRepository.Update(household);
        return ToHouseholdDto((await _householdRepository.Find(household.Id))!);
    }

    public async Task AddHouseholdMember(int householdId, string username)
    {
        var household = await _householdRepository.Find(householdId);
        var user = await _userRepository.Find(username);

        if (household is null || user is null) return;

        household.Users.Add(user);

        await _householdRepository.Update(household);
    }

    private HouseholdDto ToHouseholdDto(Household household)
    {
        return new HouseholdDto()
        {
            Id = household.Id,
            Name = household.Name,
            Usernames = _userRepository
                .Where(user => user.Households.Contains(household))
                .ToList()
                .ConvertAll(user => user.Username)
        };
    }

    private Household FromHouseholdDto(HouseholdDto dto)
    {
        return new Household()
        {
            Id = dto.Id,
            Name = dto.Name,
            Users = _userRepository.Where(user => dto.Usernames.Contains(user.Username)).ToList()
        };
    }
}